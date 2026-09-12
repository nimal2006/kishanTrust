from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import logging

from backend.database import get_db
from backend.models import CreditAssessment, Farmer, CreditStatus
from backend.schemas import CreditAssessmentCreate, CreditAssessmentUpdate, CreditAssessmentResponse

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/", response_model=CreditAssessmentResponse, status_code=status.HTTP_201_CREATED)
def create_credit_assessment(assessment: CreditAssessmentCreate, db: Session = Depends(get_db)):
    """Create a new credit assessment for a farmer"""
    try:
        # Verify farmer exists
        farmer = db.query(Farmer).filter(Farmer.id == assessment.farmer_id).first()
        if not farmer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Farmer not found"
            )
        
        db_assessment = CreditAssessment(**assessment.model_dump())
        db.add(db_assessment)
        db.commit()
        db.refresh(db_assessment)
        
        logger.info(f"Created credit assessment: {db_assessment.id} for farmer: {assessment.farmer_id}")
        return db_assessment
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating credit assessment: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create credit assessment"
        )


@router.get("/", response_model=List[CreditAssessmentResponse])
def list_credit_assessments(
    skip: int = 0,
    limit: int = 100,
    farmer_id: int = None,
    status_filter: CreditStatus = None,
    db: Session = Depends(get_db)
):
    """List credit assessments with optional filters"""
    try:
        query = db.query(CreditAssessment)
        
        if farmer_id:
            query = query.filter(CreditAssessment.farmer_id == farmer_id)
        
        if status_filter:
            query = query.filter(CreditAssessment.status == status_filter)
        
        assessments = query.offset(skip).limit(limit).all()
        return assessments
    except Exception as e:
        logger.error(f"Error listing credit assessments: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve credit assessments"
        )


@router.get("/{assessment_id}", response_model=CreditAssessmentResponse)
def get_credit_assessment(assessment_id: int, db: Session = Depends(get_db)):
    """Get a specific credit assessment by ID"""
    try:
        assessment = db.query(CreditAssessment).filter(CreditAssessment.id == assessment_id).first()
        if not assessment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Credit assessment not found"
            )
        return assessment
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving credit assessment {assessment_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve credit assessment"
        )


@router.put("/{assessment_id}", response_model=CreditAssessmentResponse)
def update_credit_assessment(
    assessment_id: int,
    assessment_update: CreditAssessmentUpdate,
    db: Session = Depends(get_db)
):
    """Update a credit assessment"""
    try:
        db_assessment = db.query(CreditAssessment).filter(CreditAssessment.id == assessment_id).first()
        if not db_assessment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Credit assessment not found"
            )
        
        # Update only provided fields
        update_data = assessment_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_assessment, field, value)
        
        db.commit()
        db.refresh(db_assessment)
        
        logger.info(f"Updated credit assessment: {assessment_id}")
        return db_assessment
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating credit assessment {assessment_id}: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update credit assessment"
        )


@router.delete("/{assessment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_credit_assessment(assessment_id: int, db: Session = Depends(get_db)):
    """Delete a credit assessment"""
    try:
        db_assessment = db.query(CreditAssessment).filter(CreditAssessment.id == assessment_id).first()
        if not db_assessment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Credit assessment not found"
            )
        
        db.delete(db_assessment)
        db.commit()
        
        logger.info(f"Deleted credit assessment: {assessment_id}")
        return None
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting credit assessment {assessment_id}: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete credit assessment"
        )
