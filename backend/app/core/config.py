"""
Centralized configuration management for the chatbot service.
Uses Pydantic Settings for environment variable validation and type safety.
"""

from typing import Optional, List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, validator


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Application Settings
    APP_NAME: str = "BIGFAT AI Chatbot Service"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = Field(default="development", description="Environment: development, staging, production")
    DEBUG: bool = Field(default=False, description="Enable debug mode")
    
    # Server Settings
    HOST: str = Field(default="0.0.0.0")
    PORT: int = Field(default=8000)
    
    # CORS Settings
    CORS_ORIGINS: List[str] = Field(
        default=[
            "http://localhost:5173",
            "http://localhost:8080",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
            "http://127.0.0.1:8080",
            "http://127.0.0.1:3000",
            "https://www.bigfat.ai",
            "https://bigfat.ai",

        ]
    )
    
    # OpenRouter API Settings
    OPENROUTER_API_KEY: Optional[str] = Field(default=None, description="OpenRouter API key")
    OPENROUTER_API_URL: str = Field(default="https://openrouter.ai/api/v1/chat/completions")
    OPENROUTER_MODEL: str = Field(default="anthropic/claude-3-haiku", description="Default LLM model")
    OPENROUTER_FALLBACK_MODEL: Optional[str] = Field(default="openai/gpt-3.5-turbo", description="Fallback model")
    SITE_URL: str = Field(default="https://www.bigfat.ai")
    SITE_NAME: str = Field(default="BIGFAT AI")
    
    # MongoDB Settings
    MONGODB_URI: Optional[str] = Field(
        default=None,
        description="MongoDB connection URI"
    )
    MONGODB_DATABASE: str = Field(default="chatbot", description="MongoDB database name")
    MONGODB_COLLECTION: str = Field(default="history", description="MongoDB collection for chatbot conversations")
    MONGODB_MAX_POOL_SIZE: int = Field(default=10, description="MongoDB connection pool size")
    MONGODB_MIN_POOL_SIZE: int = Field(default=1)
    MONGODB_TIMEOUT_MS: int = Field(default=5000, description="MongoDB connection timeout in milliseconds")
    
    # Contact Database Settings
    MONGODB_CONTACT_DATABASE: str = Field(default="contact", description="MongoDB database name for contacts")
    MONGODB_ENQUIRY_COLLECTION: str = Field(default="enquiry", description="MongoDB collection for contact enquiries")
    
    # Redis Settings (Optional - for future use)
    REDIS_ENABLED: bool = Field(default=False, description="Enable Redis for caching and rate limiting")
    REDIS_HOST: str = Field(default="localhost")
    REDIS_PORT: int = Field(default=6379)
    REDIS_DB: int = Field(default=0)
    REDIS_PASSWORD: Optional[str] = Field(default=None)
    REDIS_POOL_SIZE: int = Field(default=10)
    REDIS_TIMEOUT: int = Field(default=5)
    
    # Caching Settings
    CACHE_TTL_SECONDS: int = Field(default=3600, description="Default cache TTL (1 hour)")
    CACHE_ENABLED: bool = Field(default=False, description="Enable response caching (requires Redis)")
    
    # Rate Limiting Settings
    RATE_LIMIT_ENABLED: bool = Field(default=False, description="Enable rate limiting (requires Redis)")
    RATE_LIMIT_REQUESTS: int = Field(default=20, description="Max requests per window")
    RATE_LIMIT_WINDOW_SECONDS: int = Field(default=60, description="Rate limit window in seconds")
    
    # Chatbot Settings
    MAX_CONVERSATION_HISTORY: int = Field(default=10, description="Max messages to include in context")
    MAX_TOKENS: int = Field(default=4000, description="Max tokens for LLM response")
    TEMPERATURE: float = Field(default=0.7, description="LLM temperature")
    STREAM_ENABLED: bool = Field(default=True, description="Enable streaming responses")
    
    # Knowledgebase Settings
    KNOWLEDGEBASE_PATH: str = Field(default="data/knowledgebase.txt", description="Path to knowledgebase file")
    KNOWLEDGEBASE_VERSION: str = Field(default="1.0", description="Knowledgebase version for cache invalidation")
    
    # Logging Settings
    LOG_LEVEL: str = Field(default="INFO", description="Logging level: DEBUG, INFO, WARNING, ERROR, CRITICAL")
    JSON_LOGS: bool = Field(default=False, description="Enable JSON formatted logs")
    
    # Monitoring Settings
    METRICS_ENABLED: bool = Field(default=True, description="Enable Prometheus metrics")
    
    # Security Settings
    API_KEY_HEADER: str = Field(default="X-API-Key", description="Header name for API key")
    REQUEST_TIMEOUT: int = Field(default=30, description="Request timeout in seconds")
    MAX_REQUEST_SIZE: int = Field(default=10_000, description="Max request body size in bytes")
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )
    
    @validator("ENVIRONMENT")
    def validate_environment(cls, v):
        """Validate environment is one of the allowed values."""
        allowed = ["development", "staging", "production"]
        if v not in allowed:
            raise ValueError(f"ENVIRONMENT must be one of {allowed}")
        return v
    
    @validator("LOG_LEVEL")
    def validate_log_level(cls, v):
        """Validate log level is valid."""
        allowed = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
        if v.upper() not in allowed:
            raise ValueError(f"LOG_LEVEL must be one of {allowed}")
        return v.upper()
    
    @property
    def is_production(self) -> bool:
        """Check if running in production environment."""
        return self.ENVIRONMENT == "production"
    
    @property
    def is_development(self) -> bool:
        """Check if running in development environment."""
        return self.ENVIRONMENT == "development"


# Global settings instance
settings = Settings()
