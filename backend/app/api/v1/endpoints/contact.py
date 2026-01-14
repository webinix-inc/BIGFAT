"""
Contact API endpoints.
"""

import logging
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.contact import ContactEnquiry
from app.core.database import db_manager, DatabaseManager, get_database
from app.core.config import settings
from datetime import datetime

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def submit_enquiry(
    enquiry: ContactEnquiry,
):
    """
    Submit a contact enquiry.
    """
    try:
        if not db_manager.is_connected:
             await db_manager.connect()

        # Get the contact database
        db = db_manager.get_database_by_name(settings.MONGODB_CONTACT_DATABASE)
        collection = db[settings.MONGODB_ENQUIRY_COLLECTION]
        
        # Insert enquiry
        enquiry_dict = enquiry.dict()
        await collection.insert_one(enquiry_dict)
        
        return {"message": "Enquiry submitted successfully"}
        
    except Exception as e:
        logger.error(f"Error submitting enquiry: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error submitting enquiry: {str(e)}"
        )
