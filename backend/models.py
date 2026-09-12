from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from backend.database import Base


class UserRole(str, enum.Enum):
    """User role enumeration"""
    FARMER = "farmer"
    FPO_OFFICER = "fpo_officer"
    BANK_OFFICER = "bank_officer"
    ADMIN = "admin"


class CreditStatus(str, enum.Enum):
    """Credit assessment status"""
    PENDING = "pending"
    UNDER_REVIEW = "under_review"
    APPROVED = "approved"
    REJECTED = "rejected"


class Farmer(Base):
    """Farmer model for storing farmer information"""
    __tablename__ = "farmers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(20), nullable=False)
    address = Column(Text)
    land_size_acres = Column(Float)
    crop_types = Column(Text)  # JSON string of crop types
    fpo_id = Column(Integer, ForeignKey("fpos.id"), nullable=True)
    verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    fpo = relationship("FPO", back_populates="farmers")
    credit_assessments = relationship("CreditAssessment", back_populates="farmer")


class FPO(Base):
    """Farmer Producer Organization model"""
    __tablename__ = "fpos"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    registration_number = Column(String(100), unique=True, nullable=False)
    address = Column(Text)
    contact_person = Column(String(255))
    contact_email = Column(String(255))
    contact_phone = Column(String(20))
    member_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    farmers = relationship("Farmer", back_populates="fpo")


class CreditAssessment(Base):
    """Credit assessment model for farmer loan applications"""
    __tablename__ = "credit_assessments"
    
    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("farmers.id"), nullable=False)
    loan_amount = Column(Float, nullable=False)
    purpose = Column(Text, nullable=False)
    credit_score = Column(Float, nullable=True)
    status = Column(Enum(CreditStatus), default=CreditStatus.PENDING)
    assessment_data = Column(Text)  # JSON string of assessment details
    ai_explanation = Column(Text)  # Explainable AI reasoning
    verified_by_fpo = Column(Boolean, default=False)
    fpo_comments = Column(Text)
    bank_comments = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    farmer = relationship("Farmer", back_populates="credit_assessments")


class User(Base):
    """User model for authentication and authorization"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
