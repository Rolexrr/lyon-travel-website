from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models import Promotion, PromotionCreate, PromotionUpdate, MessageResponse
from auth import verify_token
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/promotions", tags=["Promotions"])

# Get database
def get_db():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.get("", response_model=List[Promotion])
async def get_promotions():
    """
    Get all promotions
    Public endpoint - no authentication required
    """
    try:
        db = get_db()
        promotions = await db.promotions.find().to_list(1000)
        return [Promotion(**promo) for promo in promotions]
    except Exception as e:
        logger.error(f"Error fetching promotions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("", response_model=Promotion)
async def create_promotion(promotion_input: PromotionCreate, auth: dict = Depends(verify_token)):
    """
    Create a new promotion
    Admin only - requires authentication
    """
    try:
        db = get_db()
        
        # Create promotion object
        promotion = Promotion(**promotion_input.dict())
        
        # Insert into database
        result = await db.promotions.insert_one(promotion.dict())
        
        if result.inserted_id:
            logger.info(f"New promotion created: {promotion.id}")
            return promotion
        else:
            raise HTTPException(status_code=500, detail="Failed to create promotion")
            
    except Exception as e:
        logger.error(f"Error creating promotion: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{promotion_id}", response_model=Promotion)
async def update_promotion(
    promotion_id: str,
    promotion_update: PromotionUpdate,
    auth: dict = Depends(verify_token)
):
    """
    Update a promotion
    Admin only - requires authentication
    """
    try:
        db = get_db()
        
        # Get existing promotion
        existing = await db.promotions.find_one({"id": promotion_id})
        if not existing:
            raise HTTPException(status_code=404, detail="Promotion not found")
        
        # Update only provided fields
        update_data = {k: v for k, v in promotion_update.dict().items() if v is not None}
        
        if update_data:
            await db.promotions.update_one(
                {"id": promotion_id},
                {"$set": update_data}
            )
        
        # Get updated promotion
        updated = await db.promotions.find_one({"id": promotion_id})
        logger.info(f"Promotion updated: {promotion_id}")
        return Promotion(**updated)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating promotion: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{promotion_id}", response_model=MessageResponse)
async def delete_promotion(promotion_id: str, auth: dict = Depends(verify_token)):
    """
    Delete a promotion
    Admin only - requires authentication
    """
    try:
        db = get_db()
        result = await db.promotions.delete_one({"id": promotion_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Promotion not found")
        
        logger.info(f"Promotion deleted: {promotion_id}")
        return MessageResponse(message="Promotion deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting promotion: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))