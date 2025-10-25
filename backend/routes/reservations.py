from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models import Reservation, ReservationCreate, MessageResponse
from auth import verify_token
from email_service import send_reservation_notification
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/reservations", tags=["Reservations"])

# Get database
def get_db():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.post("", response_model=Reservation)
async def create_reservation(reservation_input: ReservationCreate):
    """
    Create a new reservation request
    Public endpoint - no authentication required
    """
    try:
        db = get_db()
        
        # Create reservation object
        reservation_dict = reservation_input.dict()
        reservation = Reservation(**reservation_dict)
        
        # Insert into database
        result = await db.reservations.insert_one(reservation.dict())
        
        if result.inserted_id:
            logger.info(f"New reservation created: {reservation.id}")
            
            # Send email notification to admin
            try:
                send_reservation_notification(reservation.dict())
            except Exception as e:
                logger.error(f"Failed to send email notification: {str(e)}")
                # Don't fail the request if email fails
            
            return reservation
        else:
            raise HTTPException(status_code=500, detail="Failed to create reservation")
            
    except Exception as e:
        logger.error(f"Error creating reservation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("", response_model=List[Reservation])
async def get_reservations(auth: dict = Depends(verify_token)):
    """
    Get all reservations
    Admin only - requires authentication
    """
    try:
        db = get_db()
        reservations = await db.reservations.find().sort("createdAt", -1).to_list(1000)
        return [Reservation(**res) for res in reservations]
    except Exception as e:
        logger.error(f"Error fetching reservations: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{reservation_id}", response_model=MessageResponse)
async def delete_reservation(reservation_id: str, auth: dict = Depends(verify_token)):
    """
    Delete a reservation
    Admin only - requires authentication
    """
    try:
        db = get_db()
        result = await db.reservations.delete_one({"id": reservation_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Reservation not found")
        
        logger.info(f"Reservation deleted: {reservation_id}")
        return MessageResponse(message="Reservation deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting reservation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))