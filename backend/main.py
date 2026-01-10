"""
Main FastAPI application.
Production-ready chatbot service with MongoDB integration.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.core.database import db_manager
from app.core.cache import cache_manager
from app.api.v1 import api_router
from app.utils.logger import setup_logging, get_logger
import time

# Setup logging
setup_logging()
logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for application startup and shutdown.
    Handles database connections and cleanup.
    """
    # Startup
    logger.info(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    
    try:
        # Connect to MongoDB
        try:
            await db_manager.connect()
            logger.info("MongoDB connection established")
        except Exception as e:
            logger.warning(f"MongoDB connection failed: {e}")
            logger.warning("Application will continue in degraded mode without database")
        
        # Connect to Redis if enabled
        if settings.REDIS_ENABLED:
            await cache_manager.connect()
            if cache_manager.is_connected:
                logger.info("Redis connection established")
            else:
                logger.warning("Redis connection failed, caching disabled")
        else:
            logger.info("Redis is disabled, skipping connection")
        
        logger.info("Application startup complete")
        
    except Exception as e:
        logger.error(f"Error during startup: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("Shutting down application...")
    
    try:
        # Disconnect from MongoDB
        await db_manager.disconnect()
        logger.info("MongoDB connection closed")
        
        # Disconnect from Redis
        if cache_manager.is_connected:
            await cache_manager.disconnect()
            logger.info("Redis connection closed")
        
        logger.info("Application shutdown complete")
        
    except Exception as e:
        logger.error(f"Error during shutdown: {e}")


# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Production-ready chatbot service for BIGFAT AI Labs",
    docs_url="/docs" if settings.is_development else None,
    redoc_url="/redoc" if settings.is_development else None,
    lifespan=lifespan
)


# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all incoming requests and their processing time."""
    start_time = time.time()
    
    # Log request
    logger.info(f"Request: {request.method} {request.url.path}")
    
    # Process request
    response = await call_next(request)
    
    # Calculate processing time
    process_time = time.time() - start_time
    
    # Add custom header
    response.headers["X-Process-Time"] = str(process_time)
    
    # Log response
    logger.info(
        f"Response: {request.method} {request.url.path} "
        f"- Status: {response.status_code} - Time: {process_time:.3f}s"
    )
    
    return response


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle all unhandled exceptions."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "Internal server error",
            "path": str(request.url.path)
        }
    )


# Include API routers
app.include_router(api_router, prefix="/api")


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint - API information."""
    return {
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "environment": settings.ENVIRONMENT,
        "docs": "/docs" if settings.is_development else "disabled"
    }


# Health check endpoint
@app.get("/health")
async def health():
    """
    Global health check endpoint.
    Checks connectivity to all required services.
    """
    mongodb_status = await db_manager.health_check()
    
    redis_status = None
    if cache_manager.is_enabled:
        redis_status = await cache_manager.health_check()
    
    services = {
        "mongodb": "healthy" if mongodb_status else "unhealthy",
        "redis": "healthy" if redis_status else ("disabled" if not cache_manager.is_enabled else "unhealthy"),
        "api": "healthy"
    }
    
    overall_status = "healthy" if mongodb_status else "degraded"
    
    return {
        "status": overall_status,
        "services": services,
        "version": settings.APP_VERSION
    }


# Run with uvicorn if executed directly
if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.is_development,
        log_level=settings.LOG_LEVEL.lower()
    )
