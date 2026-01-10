"""
Pydantic schemas for chatbot requests, responses, and data models.
"""

from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field, validator


class ChatMessage(BaseModel):
    """Individual chat message."""
    
    role: str = Field(..., description="Message role: 'user', 'assistant', or 'system'")
    content: str = Field(..., description="Message content")
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow, description="Message timestamp")
    
    @validator("role")
    def validate_role(cls, v):
        """Validate role is one of the allowed values."""
        allowed = ["user", "assistant", "system"]
        if v not in allowed:
            raise ValueError(f"Role must be one of {allowed}")
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "role": "user",
                "content": "What services does BIGFAT AI Labs provide?",
                "timestamp": "2026-01-09T14:00:00Z"
            }
        }


class ChatRequest(BaseModel):
    """Request model for chat endpoint."""
    
    message: str = Field(..., min_length=1, max_length=2000, description="User message")
    history: List[ChatMessage] = Field(default=[], description="Conversation history")
    user_id: Optional[str] = Field(default=None, description="User identifier for tracking")
    session_id: Optional[str] = Field(default=None, description="Session identifier for conversation continuity")
    
    @validator("message")
    def validate_message(cls, v):
        """Validate message is not empty after stripping."""
        if not v.strip():
            raise ValueError("Message cannot be empty")
        return v.strip()
    
    @validator("history")
    def validate_history(cls, v):
        """Validate history doesn't exceed maximum length."""
        # This will be enforced in the service layer as well
        if len(v) > 50:  # Hard limit
            raise ValueError("Conversation history too long (max 50 messages)")
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "What are your AI consulting services?",
                "history": [
                    {
                        "role": "user",
                        "content": "Hello"
                    },
                    {
                        "role": "assistant",
                        "content": "Hi! How can I help you today?"
                    }
                ],
                "user_id": "user_123",
                "session_id": "session_abc"
            }
        }


class ChatResponse(BaseModel):
    """Response model for chat endpoint."""
    
    response: str = Field(..., description="AI assistant response")
    conversation_id: str = Field(..., description="Unique conversation ID")
    session_id: Optional[str] = Field(default=None, description="Session ID for continuity")
    cached: bool = Field(default=False, description="Whether response was served from cache")
    tokens_used: Optional[int] = Field(default=None, description="Number of tokens used (if available)")
    model: Optional[str] = Field(default=None, description="Model used for response")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Response timestamp")
    
    class Config:
        json_schema_extra = {
            "example": {
                "response": "BIGFAT AI Labs provides AI Consulting, Enterprise AI Platform, AI Agents/Automation, and Custom AI Solutions.",
                "conversation_id": "conv_123456789",
                "session_id": "session_abc",
                "cached": False,
                "tokens_used": 150,
                "model": "openai/gpt-4o",
                "timestamp": "2026-01-09T14:00:00Z"
            }
        }


class StreamChunk(BaseModel):
    """Individual chunk for streaming responses."""
    
    content: str = Field(..., description="Chunk content")
    done: bool = Field(default=False, description="Whether this is the final chunk")
    conversation_id: Optional[str] = Field(default=None, description="Conversation ID")
    
    class Config:
        json_schema_extra = {
            "example": {
                "content": "BIGFAT AI Labs",
                "done": False,
                "conversation_id": "conv_123456789"
            }
        }


class ConversationHistoryResponse(BaseModel):
    """Response model for conversation history retrieval."""
    
    session_id: str = Field(..., description="Session identifier")
    messages: List[ChatMessage] = Field(..., description="Conversation messages")
    message_count: int = Field(..., description="Total number of messages")
    created_at: Optional[datetime] = Field(default=None, description="First message timestamp")
    updated_at: Optional[datetime] = Field(default=None, description="Last message timestamp")
    
    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "session_abc",
                "messages": [
                    {
                        "role": "user",
                        "content": "Hello",
                        "timestamp": "2026-01-09T14:00:00Z"
                    },
                    {
                        "role": "assistant",
                        "content": "Hi! How can I help you today?",
                        "timestamp": "2026-01-09T14:00:01Z"
                    }
                ],
                "message_count": 2,
                "created_at": "2026-01-09T14:00:00Z",
                "updated_at": "2026-01-09T14:00:01Z"
            }
        }


class HealthCheckResponse(BaseModel):
    """Response model for health check endpoints."""
    
    status: str = Field(..., description="Overall health status")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Health check timestamp")
    services: Dict[str, Any] = Field(default={}, description="Individual service health status")
    
    class Config:
        json_schema_extra = {
            "example": {
                "status": "healthy",
                "timestamp": "2026-01-09T14:00:00Z",
                "services": {
                    "mongodb": {"status": "connected", "latency_ms": 5},
                    "redis": {"status": "disconnected", "reason": "disabled"},
                    "openrouter": {"status": "available"}
                }
            }
        }


class ConversationDocument(BaseModel):
    """MongoDB document model for storing conversations."""
    
    conversation_id: str = Field(..., description="Unique conversation identifier")
    session_id: Optional[str] = Field(default=None, description="Session identifier")
    user_id: Optional[str] = Field(default=None, description="User identifier")
    messages: List[ChatMessage] = Field(..., description="Conversation messages")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Creation timestamp")
    updated_at: datetime = Field(default_factory=datetime.utcnow, description="Last update timestamp")
    metadata: Dict[str, Any] = Field(default={}, description="Additional metadata")
    
    class Config:
        json_schema_extra = {
            "example": {
                "conversation_id": "conv_123456789",
                "session_id": "session_abc",
                "user_id": "user_123",
                "messages": [
                    {
                        "role": "user",
                        "content": "Hello",
                        "timestamp": "2026-01-09T14:00:00Z"
                    }
                ],
                "created_at": "2026-01-09T14:00:00Z",
                "updated_at": "2026-01-09T14:00:00Z",
                "metadata": {
                    "model": "openai/gpt-4o",
                    "tokens_used": 50
                }
            }
        }
