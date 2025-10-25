from fastapi import APIRouter, HTTPException
from models import LoginRequest, LoginResponse, AdminUser
from auth import verify_password, create_access_token, hash_password
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Get database
def get_db():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.post("/login", response_model=LoginResponse)
async def login(credentials: LoginRequest):
    """
    Admin login endpoint
    Returns JWT token on success
    """
    try:
        db = get_db()
        
        # Find admin user
        admin = await db.admin_users.find_one({"email": credentials.email})
        
        if not admin:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Verify password
        if not verify_password(credentials.password, admin["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Create access token
        access_token = create_access_token(data={"sub": credentials.email})
        
        logger.info(f"Admin login successful: {credentials.email}")
        return LoginResponse(token=access_token, email=credentials.email)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/setup-admin")
async def setup_admin():
    """
    Setup initial admin user
    This endpoint should be called once to create the admin account
    """
    try:
        db = get_db()
        
        # Check if admin already exists
        existing = await db.admin_users.find_one({"email": "lyontravel948@gmail.com"})
        if existing:
            return {"message": "Admin user already exists"}
        
        # Create admin user with hashed password
        admin = {
            "email": "lyontravel948@gmail.com",
            "password": hash_password("admin123")
        }
        
        await db.admin_users.insert_one(admin)
        logger.info("Admin user created successfully")
        
        return {"message": "Admin user created successfully"}
        
    except Exception as e:
        logger.error(f"Error setting up admin: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))