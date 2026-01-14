"""
API v1 router aggregator.
Combines all v1 endpoints into a single router.
"""

from fastapi import APIRouter
from app.api.v1.endpoints import chatbot, contact

# Create v1 API router
api_router = APIRouter(prefix="/v1")

# Include all endpoint routers
api_router.include_router(chatbot.router)
api_router.include_router(contact.router)

# Add more routers here as needed
# api_router.include_router(users.router)
# api_router.include_router(analytics.router)
