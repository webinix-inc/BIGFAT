"""
MongoDB database connection and management.
Provides async MongoDB client with connection pooling and health checks.
"""

import logging
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase, AsyncIOMotorCollection
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from app.core.config import settings

logger = logging.getLogger(__name__)


class DatabaseManager:
    """Manages MongoDB connections and provides database access."""
    
    def __init__(self):
        self.client: Optional[AsyncIOMotorClient] = None
        self.db: Optional[AsyncIOMotorDatabase] = None
        self._is_connected = False
    
    async def connect(self) -> None:
        """
        Establish connection to MongoDB.
        Creates connection pool and verifies connectivity.
        """
        try:
            logger.info(f"Connecting to MongoDB: {settings.MONGODB_DATABASE}")
            
            self.client = AsyncIOMotorClient(
                settings.MONGODB_URI,
                maxPoolSize=settings.MONGODB_MAX_POOL_SIZE,
                minPoolSize=settings.MONGODB_MIN_POOL_SIZE,
                serverSelectionTimeoutMS=settings.MONGODB_TIMEOUT_MS,
                connectTimeoutMS=settings.MONGODB_TIMEOUT_MS,
            )
            
            # Select database
            self.db = self.client[settings.MONGODB_DATABASE]
            
            # Verify connection
            await self.client.admin.command('ping')
            self._is_connected = True
            
            logger.info(f"Successfully connected to MongoDB database: {settings.MONGODB_DATABASE}")
            
            # Create indexes for chatbot collection
            await self._create_indexes()
            
        except (ConnectionFailure, ServerSelectionTimeoutError) as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            self._is_connected = False
            raise
        except Exception as e:
            logger.error(f"Unexpected error connecting to MongoDB: {e}")
            self._is_connected = False
            raise
    
    async def disconnect(self) -> None:
        """Close MongoDB connection and cleanup resources."""
        if self.client:
            try:
                logger.info("Disconnecting from MongoDB")
                self.client.close()
                self._is_connected = False
                logger.info("Successfully disconnected from MongoDB")
            except Exception as e:
                logger.error(f"Error disconnecting from MongoDB: {e}")
    
    async def health_check(self) -> bool:
        """
        Check MongoDB connection health.
        
        Returns:
            bool: True if connection is healthy, False otherwise
        """
        try:
            if not self.client:
                return False
            
            await self.client.admin.command('ping')
            return True
        except Exception as e:
            logger.error(f"MongoDB health check failed: {e}")
            return False
    
    async def _create_indexes(self) -> None:
        """Create indexes for the chatbot collection to optimize queries."""
        try:
            collection = self.get_collection()
            
            # Index on session_id for fast session retrieval
            await collection.create_index("session_id")
            
            # Index on user_id for user-specific queries
            await collection.create_index("user_id")
            
            # Compound index on user_id and timestamp for chronological retrieval
            await collection.create_index([("user_id", 1), ("timestamp", -1)])
            
            # Index on timestamp for expiration and cleanup
            await collection.create_index("timestamp")
            
            logger.info("MongoDB indexes created successfully")
            
        except Exception as e:
            logger.warning(f"Failed to create indexes (may already exist): {e}")
    
    def get_collection(self, collection_name: Optional[str] = None) -> AsyncIOMotorCollection:
        """
        Get a MongoDB collection.
        
        Args:
            collection_name: Name of collection. Defaults to settings.MONGODB_COLLECTION
            
        Returns:
            AsyncIOMotorCollection: MongoDB collection instance
            
        Raises:
            RuntimeError: If database connection is not established
        """
        if not self.db:
            raise RuntimeError("Database connection not established. Call connect() first.")
        
        coll_name = collection_name or settings.MONGODB_COLLECTION
        return self.db[coll_name]
    
    @property
    def is_connected(self) -> bool:
        """Check if database is connected."""
        return self._is_connected


# Global database manager instance
db_manager = DatabaseManager()


async def get_database() -> AsyncIOMotorDatabase:
    """
    Dependency to get database instance.
    
    Returns:
        AsyncIOMotorDatabase: MongoDB database instance
    """
    if not db_manager.is_connected:
        await db_manager.connect()
    
    return db_manager.db


async def get_chatbot_collection() -> AsyncIOMotorCollection:
    """
    Dependency to get chatbot collection.
    
    Returns:
        AsyncIOMotorCollection: Chatbot collection instance
    """
    if not db_manager.is_connected:
        await db_manager.connect()
    
    return db_manager.get_collection()
