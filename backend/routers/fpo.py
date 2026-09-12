from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import logging

from backend.database import get_db
from backend.models import FPO, Farmer
from backend.schemas import FPOCreate, FPOUpdate, FPOResponse

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/", response_model=FPOResponse, status_code=status.HTTP_201_CREATED)
def create_fpo(fpo: FPOCreate, db: Session = Depends(get_db)):
    """Create a new Farmer Producer Organization"""
    try:
        # Check if registration number already exists
        existing_fpo = db.query(FPO).filter(FPO.registration_number == fpo.registration_number).first()
        if existing_fpo:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Registration number already exists"
            )
        
        db_fpo = FPO(**fpo.model_dump())
        db.add(db_fpo)
        db.commit()
        db.refresh(db_fpo)
        
        logger.info(f"Created FPO: {db_fpo.id}")
        return db_fpo
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating FPO: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create FPO"
        )


@router.get("/", response_model=List[FPOResponse])
def list_fpos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all FPOs with pagination"""
    try:
        fpos = db.query(FPO).offset(skip).limit(limit).all()
        return fpos
    except Exception as e:
        logger.error(f"Error listing FPOs: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve FPOs"
        )


@router.get("/{fpo_id}", response_model=FPOResponse)
def get_fpo(fpo_id: int, db: Session = Depends(get_db)):
    """Get a specific FPO by ID"""
    try:
        fpo = db.query(FPO).filter(FPO.id == fpo_id).first()
        if not fpo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="FPO not found"
            )
        return fpo
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving FPO {fpo_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve FPO"
        )


@router.put("/{fpo_id}", response_model=FPOResponse)
def update_fpo(fpo_id: int, fpo_update: FPOUpdate, db: Session = Depends(get_db)):
    """Update an FPO's information"""
    try:
        db_fpo = db.query(FPO).filter(FPO.id == fpo_id).first()
        if not db_fpo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="FPO not found"
            )
        
        # Update only provided fields
        update_data = fpo_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_fpo, field, value)
        
        db.commit()
        db.refresh(db_fpo)
        
        logger.info(f"Updated FPO: {fpo_id}")
        return db_fpo
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating FPO {fpo_id}: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update FPO"
        )


@router.delete("/{fpo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_fpo(fpo_id: int, db: Session = Depends(get_db)):
    """Delete an FPO"""
    try:
        db_fpo = db.query(FPO).filter(FPO.id == fpo_id).first()
        if not db_fpo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="FPO not found"
            )
        
        db.delete(db_fpo)
        db.commit()
        
        logger.info(f"Deleted FPO: {fpo_id}")
        return None
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting FPO {fpo_id}: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete FPO"
        )


@router.get("/{fpo_id}/members", response_model=List)
def get_fpo_members(fpo_id: int, db: Session = Depends(get_db)):
    """Get all farmers belonging to an FPO"""
    try:
        fpo = db.query(FPO).filter(FPO.id == fpo_id).first()
        if not fpo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="FPO not found"
            )
        
        farmers = db.query(Farmer).filter(Farmer.fpo_id == fpo_id).all()
        return farmers
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving FPO members for {fpo_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve FPO members"
        )
