"""
Redis cache management for caching and rate limiting.
Gracefully degrades when Redis is not available.
"""

import logging
from typing import Optional, Any
import json
from redis import asyncio as aioredis
from redis.exceptions import RedisError, ConnectionError
from app.core.config import settings

logger = logging.getLogger(__name__)


class CacheManager:
    """Manages Redis connections and caching operations."""
    
    def __init__(self):
        self.redis: Optional[aioredis.Redis] = None
        self._is_connected = False
        self._is_enabled = settings.REDIS_ENABLED
    
    async def connect(self) -> None:
        """
        Establish connection to Redis.
        If Redis is disabled or connection fails, cache will be disabled.
        """
        if not self._is_enabled:
            logger.info("Redis is disabled in configuration")
            return
        
        try:
            logger.info(f"Connecting to Redis at {settings.REDIS_HOST}:{settings.REDIS_PORT}")
            
            self.redis = await aioredis.from_url(
                f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/{settings.REDIS_DB}",
                password=settings.REDIS_PASSWORD,
                max_connections=settings.REDIS_POOL_SIZE,
                decode_responses=True,
                socket_timeout=settings.REDIS_TIMEOUT,
                socket_connect_timeout=settings.REDIS_TIMEOUT,
            )
            
            # Verify connection
            await self.redis.ping()
            self._is_connected = True
            
            logger.info("Successfully connected to Redis")
            
        except (RedisError, ConnectionError) as e:
            logger.warning(f"Failed to connect to Redis: {e}. Cache will be disabled.")
            self._is_connected = False
            self.redis = None
        except Exception as e:
            logger.warning(f"Unexpected error connecting to Redis: {e}. Cache will be disabled.")
            self._is_connected = False
            self.redis = None
    
    async def disconnect(self) -> None:
        """Close Redis connection."""
        if self.redis:
            try:
                logger.info("Disconnecting from Redis")
                await self.redis.close()
                self._is_connected = False
                logger.info("Successfully disconnected from Redis")
            except Exception as e:
                logger.error(f"Error disconnecting from Redis: {e}")
    
    async def health_check(self) -> bool:
        """
        Check Redis connection health.
        
        Returns:
            bool: True if connection is healthy, False otherwise
        """
        if not self._is_enabled or not self.redis:
            return False
        
        try:
            await self.redis.ping()
            return True
        except Exception as e:
            logger.error(f"Redis health check failed: {e}")
            return False
    
    async def get(self, key: str) -> Optional[str]:
        """
        Get value from cache.
        
        Args:
            key: Cache key
            
        Returns:
            Optional[str]: Cached value or None if not found or cache unavailable
        """
        if not self._is_connected or not self.redis:
            return None
        
        try:
            value = await self.redis.get(key)
            if value:
                logger.debug(f"Cache hit for key: {key}")
            return value
        except Exception as e:
            logger.warning(f"Error getting cache key {key}: {e}")
            return None
    
    async def set(self, key: str, value: str, ttl: Optional[int] = None) -> bool:
        """
        Set value in cache with optional TTL.
        
        Args:
            key: Cache key
            value: Value to cache
            ttl: Time to live in seconds. Defaults to settings.CACHE_TTL_SECONDS
            
        Returns:
            bool: True if successful, False otherwise
        """
        if not self._is_connected or not self.redis:
            return False
        
        try:
            ttl = ttl or settings.CACHE_TTL_SECONDS
            await self.redis.setex(key, ttl, value)
            logger.debug(f"Cache set for key: {key} with TTL: {ttl}s")
            return True
        except Exception as e:
            logger.warning(f"Error setting cache key {key}: {e}")
            return False
    
    async def delete(self, key: str) -> bool:
        """
        Delete key from cache.
        
        Args:
            key: Cache key to delete
            
        Returns:
            bool: True if successful, False otherwise
        """
        if not self._is_connected or not self.redis:
            return False
        
        try:
            await self.redis.delete(key)
            logger.debug(f"Cache deleted for key: {key}")
            return True
        except Exception as e:
            logger.warning(f"Error deleting cache key {key}: {e}")
            return False
    
    async def increment(self, key: str, amount: int = 1) -> Optional[int]:
        """
        Increment a counter in cache.
        
        Args:
            key: Cache key
            amount: Amount to increment by
            
        Returns:
            Optional[int]: New value after increment, or None if failed
        """
        if not self._is_connected or not self.redis:
            return None
        
        try:
            return await self.redis.incrby(key, amount)
        except Exception as e:
            logger.warning(f"Error incrementing cache key {key}: {e}")
            return None
    
    async def expire(self, key: str, ttl: int) -> bool:
        """
        Set expiration time for a key.
        
        Args:
            key: Cache key
            ttl: Time to live in seconds
            
        Returns:
            bool: True if successful, False otherwise
        """
        if not self._is_connected or not self.redis:
            return False
        
        try:
            await self.redis.expire(key, ttl)
            return True
        except Exception as e:
            logger.warning(f"Error setting expiration for key {key}: {e}")
            return False
    
    async def check_rate_limit(self, identifier: str, max_requests: Optional[int] = None, window: Optional[int] = None) -> tuple[bool, int]:
        """
        Check if request is within rate limit.
        
        Args:
            identifier: Unique identifier (user_id, IP, etc.)
            max_requests: Maximum requests allowed. Defaults to settings.RATE_LIMIT_REQUESTS
            window: Time window in seconds. Defaults to settings.RATE_LIMIT_WINDOW_SECONDS
            
        Returns:
            tuple[bool, int]: (is_allowed, current_count)
        """
        if not settings.RATE_LIMIT_ENABLED or not self._is_connected or not self.redis:
            return True, 0  # Allow all requests if rate limiting is disabled
        
        max_requests = max_requests or settings.RATE_LIMIT_REQUESTS
        window = window or settings.RATE_LIMIT_WINDOW_SECONDS
        
        try:
            key = f"rate_limit:{identifier}"
            current = await self.redis.get(key)
            
            if current is None:
                # First request in window
                await self.redis.setex(key, window, 1)
                return True, 1
            
            current_count = int(current)
            
            if current_count >= max_requests:
                return False, current_count
            
            # Increment counter
            new_count = await self.redis.incr(key)
            return True, new_count
            
        except Exception as e:
            logger.warning(f"Error checking rate limit for {identifier}: {e}")
            return True, 0  # Allow request on error
    
    @property
    def is_connected(self) -> bool:
        """Check if cache is connected and available."""
        return self._is_connected
    
    @property
    def is_enabled(self) -> bool:
        """Check if cache is enabled in configuration."""
        return self._is_enabled


# Global cache manager instance
cache_manager = CacheManager()


async def get_cache() -> CacheManager:
    """
    Dependency to get cache manager.
    
    Returns:
        CacheManager: Cache manager instance
    """
    if cache_manager.is_enabled and not cache_manager.is_connected:
        await cache_manager.connect()
    
    return cache_manager
