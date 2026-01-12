"""
Chatbot API endpoints.
Provides RESTful API for chat, streaming, and conversation history.
"""

import logging
from typing import AsyncGenerator
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from app.schemas.chatbot import (
    ChatRequest,
    ChatResponse,
    ConversationHistoryResponse,
    HealthCheckResponse,
    StreamChunk
)
from app.services.chatbot_service import ChatbotService, get_chatbot_service
from app.core.cache import CacheManager, get_cache
from app.core.database import db_manager
from app.core.config import settings
from datetime import datetime
import json

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])


@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    chatbot_service: ChatbotService = Depends(get_chatbot_service),
    cache: CacheManager = Depends(get_cache)
) -> ChatResponse:
    """
    Send a chat message and receive AI response.
    
    - **message**: User message (required)
    - **history**: Previous conversation messages (optional)
    - **user_id**: User identifier for tracking (optional)
    - **session_id**: Session identifier for conversation continuity (optional)
    
    Returns AI response with conversation metadata and caching information.
    """
    try:
        # Rate limiting check if enabled
        if settings.RATE_LIMIT_ENABLED and cache.is_connected:
            identifier = request.user_id or "anonymous"
            is_allowed, count = await cache.check_rate_limit(identifier)
            
            if not is_allowed:
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail=f"Rate limit exceeded. Max {settings.RATE_LIMIT_REQUESTS} requests per {settings.RATE_LIMIT_WINDOW_SECONDS} seconds."
                )
        
        # Process chat request
        response = await chatbot_service.chat(request)
        
        logger.info(f"Chat request processed successfully (cached: {response.cached})")
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing chat request: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing chat request: {str(e)}"
        )


@router.post("/stream")
async def stream_chat(
    request: ChatRequest,
    chatbot_service: ChatbotService = Depends(get_chatbot_service),
    cache: CacheManager = Depends(get_cache)
):
    """
    Stream chat response in real-time using Server-Sent Events.
    
    - **message**: User message (required)
    - **history**: Previous conversation messages (optional)
    - **user_id**: User identifier (optional)
    - **session_id**: Session identifier (optional)
    
    Returns a stream of text chunks as the AI generates the response.
    """
    try:
        # Rate limiting check if enabled
        if settings.RATE_LIMIT_ENABLED and cache.is_connected:
            identifier = request.user_id or "anonymous"
            is_allowed, count = await cache.check_rate_limit(identifier)
            
            if not is_allowed:
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail=f"Rate limit exceeded."
                )
        
        async def event_generator() -> AsyncGenerator[str, None]:
            """Generate Server-Sent Events."""
            try:
                async for chunk in chatbot_service.stream_chat(request):
                    # Format as SSE
                    yield f"data: {json.dumps({'content': chunk, 'done': False})}\n\n"
                
                # Send final done message
                yield f"data: {json.dumps({'content': '', 'done': True})}\n\n"
                
            except Exception as e:
                logger.error(f"Error in stream: {e}")
                yield f"data: {json.dumps({'error': str(e), 'done': True})}\n\n"
        
        return StreamingResponse(
            event_generator(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no"
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error setting up stream: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error setting up stream: {str(e)}"
        )


@router.get("/history/{session_id}", response_model=ConversationHistoryResponse)
async def get_history(
    session_id: str,
    chatbot_service: ChatbotService = Depends(get_chatbot_service)
) -> ConversationHistoryResponse:
    """
    Retrieve conversation history for a session.
    
    - **session_id**: Session identifier
    
    Returns all messages in the conversation session.
    """
    try:
        messages = await chatbot_service.get_session_history(session_id)
        
        created_at = messages[0].timestamp if messages else None
        updated_at = messages[-1].timestamp if messages else None
        
        return ConversationHistoryResponse(
            session_id=session_id,
            messages=messages,
            message_count=len(messages),
            created_at=created_at,
            updated_at=updated_at
        )
        
    except Exception as e:
        logger.error(f"Error retrieving history: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving conversation history: {str(e)}"
        )


@router.delete("/history/{session_id}")
async def clear_history(
    session_id: str,
    chatbot_service: ChatbotService = Depends(get_chatbot_service)
) -> dict:
    """
    Clear conversation history for a session.
    
    - **session_id**: Session identifier
    
    Returns the number of conversations deleted.
    """
    try:
        deleted_count = await chatbot_service.clear_session_history(session_id)
        
        return {
            "session_id": session_id,
            "deleted_count": deleted_count,
            "message": f"Cleared {deleted_count} conversations for session {session_id}"
        }
        
    except Exception as e:
        logger.error(f"Error clearing history: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error clearing conversation history: {str(e)}"
        )


@router.get("/health", response_model=HealthCheckResponse)
async def health_check(
    cache: CacheManager = Depends(get_cache)
) -> HealthCheckResponse:
    """
    Check health status of chatbot service and its dependencies.
    
    Returns:
        Health status of MongoDB, Redis, and OpenRouter API
    """
    try:
        services = {}
        
        # Check MongoDB
        mongodb_healthy = await db_manager.health_check()
        services["mongodb"] = {
            "status": "connected" if mongodb_healthy else "disconnected"
        }
        
        # Check Redis
        if cache.is_enabled:
            redis_healthy = await cache.health_check()
            services["redis"] = {
                "status": "connected" if redis_healthy else "disconnected"
            }
        else:
            services["redis"] = {
                "status": "disabled",
                "reason": "Redis not enabled in configuration"
            }
        
        # Check OpenRouter API key
        services["openrouter"] = {
            "status": "configured" if settings.OPENROUTER_API_KEY else "missing_api_key"
        }
        
        # Overall status
        overall_status = "healthy" if mongodb_healthy else "degraded"
        
        return HealthCheckResponse(
            status=overall_status,
            timestamp=datetime.utcnow(),
            services=services
        )
        
    except Exception as e:
        logger.error(f"Error in health check: {e}")
        return HealthCheckResponse(
            status="unhealthy",
            timestamp=datetime.utcnow(),
            services={"error": str(e)}
        )
