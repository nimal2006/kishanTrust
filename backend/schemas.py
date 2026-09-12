from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from backend.models import UserRole, CreditStatus


# Farmer Schemas
class FarmerBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    address: Optional[str] = None
    land_size_acres: Optional[float] = Field(None, ge=0)
    crop_types: Optional[str] = None
    fpo_id: Optional[int] = None


class FarmerCreate(FarmerBase):
    pass


class FarmerUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, min_length=10, max_length=20)
    address: Optional[str] = None
    land_size_acres: Optional[float] = Field(None, ge=0)
    crop_types: Optional[str] = None
    fpo_id: Optional[int] = None
    verified: Optional[bool] = None


class FarmerResponse(FarmerBase):
    id: int
    verified: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# FPO Schemas
class FPOBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    registration_number: str = Field(..., min_length=1, max_length=100)
    address: Optional[str] = None
    contact_person: Optional[str] = None
    contact_email: Optional[EmailStr] = None
    contact_phone: Optional[str] = None


class FPOCreate(FPOBase):
    pass


class FPOUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    address: Optional[str] = None
    contact_person: Optional[str] = None
    contact_email: Optional[EmailStr] = None
    contact_phone: Optional[str] = None
    member_count: Optional[int] = Field(None, ge=0)


class FPOResponse(FPOBase):
    id: int
    member_count: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Credit Assessment Schemas
class CreditAssessmentBase(BaseModel):
    farmer_id: int
    loan_amount: float = Field(..., gt=0)
    purpose: str = Field(..., min_length=1)


class CreditAssessmentCreate(CreditAssessmentBase):
    pass


class CreditAssessmentUpdate(BaseModel):
    status: Optional[CreditStatus] = None
    credit_score: Optional[float] = Field(None, ge=0, le=100)
    assessment_data: Optional[str] = None
    ai_explanation: Optional[str] = None
    verified_by_fpo: Optional[bool] = None
    fpo_comments: Optional[str] = None
    bank_comments: Optional[str] = None


class CreditAssessmentResponse(CreditAssessmentBase):
    id: int
    credit_score: Optional[float]
    status: CreditStatus
    assessment_data: Optional[str]
    ai_explanation: Optional[str]
    verified_by_fpo: bool
    fpo_comments: Optional[str]
    bank_comments: Optional[str]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# User Schemas
class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=100)
    email: EmailStr
    role: UserRole


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
