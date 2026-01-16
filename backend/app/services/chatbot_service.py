"""
Chatbot service containing core business logic.
Handles knowledgebase, conversation management, and response generation.
"""

import logging
import os
import uuid
from typing import List, Optional, Dict, Any
from datetime import datetime
from app.core.config import settings
from app.core.cache import CacheManager, get_cache
from app.schemas.chatbot import ChatMessage, ChatRequest, ChatResponse
from app.repositories.chatbot_repository import ChatbotRepository, get_chatbot_repository
from app.services.llm_service import LLMService, get_llm_service
import hashlib
import json

logger = logging.getLogger(__name__)


class ChatbotService:
    """Service for chatbot business logic."""
    
    def __init__(
        self,
        llm_service: LLMService,
        repository: ChatbotRepository,
        cache: CacheManager
    ):
        self.llm_service = llm_service
        self.repository = repository
        self.cache = cache
        self._knowledgebase = None
        self._knowledgebase_version = settings.KNOWLEDGEBASE_VERSION
    
    def _load_knowledgebase(self) -> str:
        """
        Load knowledgebase from file.
        Cached in memory for performance.
        
        Returns:
            str: Knowledgebase content
        """
        if self._knowledgebase is not None:
            return self._knowledgebase
        
        try:
            file_path = os.path.join(
                os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                settings.KNOWLEDGEBASE_PATH
            )
            
            with open(file_path, "r", encoding="utf-8") as f:
                self._knowledgebase = f.read()
            
            logger.info("Knowledgebase loaded successfully")
            return self._knowledgebase
            
        except Exception as e:
            logger.error(f"Error loading knowledgebase: {e}")
            return "BIGFAT AI Labs is an enterprise AI company providing AI solutions."
    
    def _build_system_prompt(self) -> str:
        """
        Build system prompt with knowledgebase context.
        
        Returns:
            str: System prompt
        """
        knowledgebase = self._load_knowledgebase()
        
        return f"""You are a helpful AI assistant for BIGFAT AI Labs, an enterprise AI company specializing in Generative AI solutions, custom development, and AI partnerships.

Your role is to provide comprehensive, accurate, and helpful responses about:
- AI services and technical capabilities
- Products and platforms
- Technology stack and implementation details
- Enterprise AI solutions and integration
- Development processes and methodologies
- Features and scope of solutions

Guidelines for responses:
1. For pricing questions: Politely decline and focus on features, scope, and capabilities instead
2. For technical questions: Provide detailed, specific answers using technical knowledge in your context
3. For service inquiries: Explain capabilities clearly and suggest next steps
4. For implementation questions: Explain our approach and technical capabilities
5. If information is not in context: Politely say you don't know and offer to connect to human experts
6. Use clear, professional language with appropriate technical depth
7. Keep ALL responses under 100 words maximum
8. For complex technical questions, provide structured answers with bullet points
9. Always include relevant contact information when appropriate
10. Suggest appointment booking for detailed consultations: https://cal.com/bigfat-ai-tasbkl

IMPORTANT: Never discuss pricing, costs, or financial information. Focus only on features, scope, and technical capabilities.

Context about BIGFAT AI Labs:
{knowledgebase}

Remember: You are representing a professional AI company. Be helpful, accurate, maintain a professional tone, and keep responses concise (under 30 words)."""
    
    def _generate_cache_key(self, message: str, history: List[ChatMessage]) -> str:
        """
        Generate cache key for a chat request.
        Uses hash of message and relevant history.
        
        Args:
            message: User message
            history: Conversation history
            
        Returns:
            str: Cache key
        """
        # Include last few messages in cache key for context-aware caching
        recent_history = history[-3:] if len(history) > 3 else history
        
        cache_content = {
            "message": message.lower().strip(),
            "history": [{"role": msg.role, "content": msg.content} for msg in recent_history],
            "kb_version": self._knowledgebase_version
        }
        
        content_str = json.dumps(cache_content, sort_keys=True)
        hash_obj = hashlib.sha256(content_str.encode())
        
        return f"chat_response:{hash_obj.hexdigest()}"
    
    async def chat(self, request: ChatRequest) -> ChatResponse:
        """
        Process chat request and generate response.
        
        Args:
            request: Chat request
            
        Returns:
            ChatResponse: AI response with metadata
        """
        try:
            # Generate conversation and session IDs if not provided
            conversation_id = str(uuid.uuid4())
            session_id = request.session_id or str(uuid.uuid4())
            
            # Check cache if enabled
            cached_response = None
            if settings.CACHE_ENABLED and self.cache.is_connected:
                cache_key = self._generate_cache_key(request.message, request.history)
                cached_response = await self.cache.get(cache_key)
                
                if cached_response:
                    logger.info(f"Cache hit for message: {request.message[:50]}...")
                    
                    try:
                        cached_data = json.loads(cached_response)
                        return ChatResponse(
                            response=cached_data["response"],
                            conversation_id=conversation_id,
                            session_id=session_id,
                            cached=True,
                            tokens_used=cached_data.get("tokens_used"),
                            model=cached_data.get("model"),
                            timestamp=datetime.utcnow()
                        )
                    except json.JSONDecodeError:
                        logger.warning("Invalid cached response format, fetching fresh response")
            
            # Build messages for LLM
            messages = [
                {"role": "system", "content": self._build_system_prompt()}
            ]
            
            # Add conversation history (limit to avoid context overflow)
            max_history = settings.MAX_CONVERSATION_HISTORY
            recent_history = request.history[-max_history:] if len(request.history) > max_history else request.history
            
            for msg in recent_history:
                messages.append({
                    "role": msg.role,
                    "content": msg.content
                })
            
            # Add current user message
            messages.append({
                "role": "user",
                "content": request.message
            })
            
            # Call LLM service
            logger.info(f"Calling LLM for user message: {request.message[:50]}...")
            
            llm_response = await self.llm_service.chat_completion(messages)
            
            # Extract response
            ai_message = llm_response['choices'][0]['message']['content']
            model_used = llm_response.get('model', settings.OPENROUTER_MODEL)
            tokens_used = llm_response.get('usage', {}).get('total_tokens')
            
            logger.info(f"Received LLM response (tokens: {tokens_used})")
            
            # Cache the response if enabled
            if settings.CACHE_ENABLED and self.cache.is_connected:
                cache_data = {
                    "response": ai_message,
                    "tokens_used": tokens_used,
                    "model": model_used
                }
                await self.cache.set(cache_key, json.dumps(cache_data), ttl=settings.CACHE_TTL_SECONDS)
            
            # Build full conversation for storage
            full_messages = recent_history + [
                ChatMessage(role="user", content=request.message, timestamp=datetime.utcnow()),
                ChatMessage(role="assistant", content=ai_message, timestamp=datetime.utcnow())
            ]
            
            # Save conversation to database
            await self.repository.save_conversation(
                conversation_id=conversation_id,
                messages=full_messages,
                user_id=request.user_id,
                session_id=session_id,
                metadata={
                    "model": model_used,
                    "tokens_used": tokens_used,
                    "cached": False
                }
            )
            
            return ChatResponse(
                response=ai_message,
                conversation_id=conversation_id,
                session_id=session_id,
                cached=False,
                tokens_used=tokens_used,
                model=model_used,
                timestamp=datetime.utcnow()
            )
            
        except Exception as e:
            logger.error(f"Error in chat service: {e}")
            raise
    
    async def stream_chat(self, request: ChatRequest):
        """
        Stream chat response.
        
        Args:
            request: Chat request
            
        Yields:
            str: Content chunks
        """
        try:
            # Build messages
            messages = [
                {"role": "system", "content": self._build_system_prompt()}
            ]
            
            # Add history
            max_history = settings.MAX_CONVERSATION_HISTORY
            recent_history = request.history[-max_history:] if len(request.history) > max_history else request.history
            
            for msg in recent_history:
                messages.append({
                    "role": msg.role,
                    "content": msg.content
                })
            
            # Add current message
            messages.append({
                "role": "user",
                "content": request.message
            })
            
            logger.info(f"Starting streaming chat for message: {request.message[:50]}...")
            
            # Stream from LLM
            full_response = ""
            async for chunk in self.llm_service.stream_chat_completion(messages):
                full_response += chunk
                yield chunk
            
            # After streaming completes, save to database
            conversation_id = str(uuid.uuid4())
            session_id = request.session_id or str(uuid.uuid4())
            
            full_messages = recent_history + [
                ChatMessage(role="user", content=request.message, timestamp=datetime.utcnow()),
                ChatMessage(role="assistant", content=full_response, timestamp=datetime.utcnow())
            ]
            
            await self.repository.save_conversation(
                conversation_id=conversation_id,
                messages=full_messages,
                user_id=request.user_id,
                session_id=session_id,
                metadata={"model": settings.OPENROUTER_MODEL, "streaming": True}
            )
            
        except Exception as e:
            logger.error(f"Error in streaming chat: {e}")
            raise
    
    async def get_session_history(self, session_id: str) -> List[ChatMessage]:
        """
        Get conversation history for a session.
        
        Args:
            session_id: Session identifier
            
        Returns:
            List[ChatMessage]: All messages in session
        """
        try:
            conversations = await self.repository.get_session_history(session_id)
            
            # Flatten all messages from all conversations
            all_messages = []
            for conv in conversations:
                all_messages.extend(conv.messages)
            
            # Sort by timestamp
            all_messages.sort(key=lambda msg: msg.timestamp or datetime.min)
            
            return all_messages
            
        except Exception as e:
            logger.error(f"Error getting session history: {e}")
            return []
    
    async def clear_session_history(self, session_id: str) -> int:
        """
        Clear conversation history for a session.
        
        Args:
            session_id: Session identifier
            
        Returns:
            int: Number of conversations deleted
        """
        try:
            deleted_count = await self.repository.delete_session_history(session_id)
            logger.info(f"Cleared {deleted_count} conversations for session {session_id}")
            return deleted_count
            
        except Exception as e:
            logger.error(f"Error clearing session history: {e}")
            return 0


async def get_chatbot_service() -> ChatbotService:
    """
    Dependency to get chatbot service.
    
    Returns:
        ChatbotService: Chatbot service instance
    """
    llm = get_llm_service()
    repo = await get_chatbot_repository()
    cache = await get_cache()
    
    return ChatbotService(llm, repo, cache)
