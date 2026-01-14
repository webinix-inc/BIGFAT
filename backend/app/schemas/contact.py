"""
Pydantic schemas for contact form enquiries.
"""

from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field, EmailStr

class ContactEnquiry(BaseModel):
    """Schema for contact form submission."""
    
    name: str = Field(..., min_length=1, description="Name of the person")
    email: EmailStr = Field(..., description="Email address")
    mobile: str = Field(..., min_length=10, description="Mobile number")
    requirement: str = Field(..., description="Type of requirement/service")
    message: str = Field(..., description="Message content")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Submission timestamp")

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "mobile": "+1234567890",
                "requirement": "consulting",
                "message": "I need help with AI strategy."
            }
        }
