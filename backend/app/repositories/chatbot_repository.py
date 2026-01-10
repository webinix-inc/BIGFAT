"""
Repository layer for chatbot data access.
Handles MongoDB operations for conversation storage and retrieval.
"""

import logging
from typing import List, Optional
from datetime import datetime
import uuid
from motor.motor_asyncio import AsyncIOMotorCollection
from app.schemas.chatbot import ChatMessage, ConversationDocument
from app.core.database import get_chatbot_collection

logger = logging.getLogger(__name__)


class ChatbotRepository:
    """Repository for chatbot conversation data access."""
    
    def __init__(self, collection: AsyncIOMotorCollection):
        self.collection = collection
    
    async def save_conversation(
        self,
        conversation_id: str,
        messages: List[ChatMessage],
        user_id: Optional[str] = None,
        session_id: Optional[str] = None,
        metadata: Optional[dict] = None
    ) -> bool:
        """
        Save or update a conversation in MongoDB.
        
        Args:
            conversation_id: Unique conversation identifier
            messages: List of chat messages
            user_id: User identifier
            session_id: Session identifier
            metadata: Additional metadata
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            now = datetime.utcnow()
            
            # Convert messages to dict format
            messages_dict = [msg.model_dump() for msg in messages]
            
            document = {
                "conversation_id": conversation_id,
                "session_id": session_id,
                "user_id": user_id,
                "messages": messages_dict,
                "updated_at": now,
                "metadata": metadata or {}
            }
            
            # Upsert: update if exists, insert if not
            result = await self.collection.update_one(
                {"conversation_id": conversation_id},
                {
                    "$set": document,
                    "$setOnInsert": {"created_at": now}
                },
                upsert=True
            )
            
            logger.info(f"Saved conversation {conversation_id} (matched: {result.matched_count}, modified: {result.modified_count})")
            return True
            
        except Exception as e:
            logger.error(f"Error saving conversation {conversation_id}: {e}")
            return False
    
    async def get_conversation(self, conversation_id: str) -> Optional[ConversationDocument]:
        """
        Retrieve a conversation by ID.
        
        Args:
            conversation_id: Conversation identifier
            
        Returns:
            Optional[ConversationDocument]: Conversation document or None if not found
        """
        try:
            doc = await self.collection.find_one({"conversation_id": conversation_id})
            
            if not doc:
                return None
            
            # Remove MongoDB _id field
            doc.pop("_id", None)
            
            return ConversationDocument(**doc)
            
        except Exception as e:
            logger.error(f"Error retrieving conversation {conversation_id}: {e}")
            return None
    
    async def get_session_history(self, session_id: str, limit: int = 50) -> List[ConversationDocument]:
        """
        Retrieve all conversations for a session.
        
        Args:
            session_id: Session identifier
            limit: Maximum number of conversations to retrieve
            
        Returns:
            List[ConversationDocument]: List of conversations
        """
        try:
            cursor = self.collection.find(
                {"session_id": session_id}
            ).sort("updated_at", -1).limit(limit)
            
            conversations = []
            async for doc in cursor:
                doc.pop("_id", None)
                conversations.append(ConversationDocument(**doc))
            
            logger.info(f"Retrieved {len(conversations)} conversations for session {session_id}")
            return conversations
            
        except Exception as e:
            logger.error(f"Error retrieving session history {session_id}: {e}")
            return []
    
    async def get_user_history(self, user_id: str, limit: int = 50) -> List[ConversationDocument]:
        """
        Retrieve all conversations for a user.
        
        Args:
            user_id: User identifier
            limit: Maximum number of conversations to retrieve
            
        Returns:
            List[ConversationDocument]: List of conversations
        """
        try:
            cursor = self.collection.find(
                {"user_id": user_id}
            ).sort("updated_at", -1).limit(limit)
            
            conversations = []
            async for doc in cursor:
                doc.pop("_id", None)
                conversations.append(ConversationDocument(**doc))
            
            logger.info(f"Retrieved {len(conversations)} conversations for user {user_id}")
            return conversations
            
        except Exception as e:
            logger.error(f"Error retrieving user history {user_id}: {e}")
            return []
    
    async def delete_conversation(self, conversation_id: str) -> bool:
        """
        Delete a conversation by ID.
        
        Args:
            conversation_id: Conversation identifier
            
        Returns:
            bool: True if deleted, False otherwise
        """
        try:
            result = await self.collection.delete_one({"conversation_id": conversation_id})
            
            if result.deleted_count > 0:
                logger.info(f"Deleted conversation {conversation_id}")
                return True
            else:
                logger.warning(f"Conversation {conversation_id} not found for deletion")
                return False
                
        except Exception as e:
            logger.error(f"Error deleting conversation {conversation_id}: {e}")
            return False
    
    async def delete_session_history(self, session_id: str) -> int:
        """
        Delete all conversations for a session.
        
        Args:
            session_id: Session identifier
            
        Returns:
            int: Number of conversations deleted
        """
        try:
            result = await self.collection.delete_many({"session_id": session_id})
            
            logger.info(f"Deleted {result.deleted_count} conversations for session {session_id}")
            return result.deleted_count
            
        except Exception as e:
            logger.error(f"Error deleting session history {session_id}: {e}")
            return 0
    
    async def append_message(
        self,
        conversation_id: str,
        message: ChatMessage
    ) -> bool:
        """
        Append a message to an existing conversation.
        
        Args:
            conversation_id: Conversation identifier
            message: Message to append
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            result = await self.collection.update_one(
                {"conversation_id": conversation_id},
                {
                    "$push": {"messages": message.model_dump()},
                    "$set": {"updated_at": datetime.utcnow()}
                }
            )
            
            if result.modified_count > 0:
                logger.info(f"Appended message to conversation {conversation_id}")
                return True
            else:
                logger.warning(f"Conversation {conversation_id} not found for message append")
                return False
                
        except Exception as e:
            logger.error(f"Error appending message to conversation {conversation_id}: {e}")
            return False


async def get_chatbot_repository() -> ChatbotRepository:
    """
    Dependency to get chatbot repository instance.
    
    Returns:
        ChatbotRepository: Repository instance
    """
    collection = await get_chatbot_collection()
    return ChatbotRepository(collection)
