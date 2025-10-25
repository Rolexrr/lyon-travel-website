from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

# Reservation Models
class ReservationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: str
    destination: Optional[str] = ""
    date: Optional[str] = ""
    message: Optional[str] = ""

class Reservation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    service: str
    destination: Optional[str] = ""
    date: Optional[str] = ""
    message: Optional[str] = ""
    status: str = "pending"
    createdAt: datetime = Field(default_factory=datetime.utcnow)

# Promotion Models
class PromotionCreate(BaseModel):
    serviceId: int
    title: str
    description: str
    discount: str
    validUntil: str
    active: bool = True

class Promotion(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    serviceId: int
    title: str
    description: str
    discount: str
    validUntil: str
    active: bool

class PromotionUpdate(BaseModel):
    serviceId: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    discount: Optional[str] = None
    validUntil: Optional[str] = None
    active: Optional[bool] = None

# Auth Models
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    token: str
    email: str

class AdminUser(BaseModel):
    email: EmailStr
    password: str  # Will be hashed

# Response Models
class MessageResponse(BaseModel):
    message: str