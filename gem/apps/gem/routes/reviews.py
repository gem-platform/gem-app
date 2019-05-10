from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Schema, validator

from api.review import Review
from api.user import User
from db import models, session_scope
from mappers.review import map_model_to_review, map_review_to_model

from .auth import get_current_active_user

router = APIRouter()


@router.post("/")
async def create_proposal(
        review: Review,
        current_user: User = Depends(get_current_active_user)) -> models.Review:
    """Create new review using specified data."""
    with session_scope() as s:
        review_db = map_review_to_model(review)
        s.add(review_db)
        s.flush()  # save to db to be able to obtain ID for mapping below
        return map_model_to_review(review_db)


@router.put("/{oid}")
async def update_review(
        oid: int,
        review: Review,
        current_user: User = Depends(get_current_active_user)):
    """Update proposal"""
    with session_scope() as s:
        review_db = s.query(models.Review).filter_by(
            id=oid).first()  # type: models.Review
        if not review_db:
            raise HTTPException(status_code=404, detail="Review not found")
        review_db.title = review.title
        review_db.start = review.start
        review_db.end = review.end
        # todo: check proposal exists
        review_db.proposal_id = review.proposal
        return map_model_to_review(review_db)


@router.delete("/{oid}")
async def delete_review(
        oid: int,
        current_user: User = Depends(get_current_active_user)):
    """Delete proposal using specified ID."""
    with session_scope() as s:
        review_db = s.query(models.Review).filter_by(
            id=oid).first()  # type: models.Review
        if not review_db:
            raise HTTPException(status_code=404, detail="Review not found")
        s.delete(review_db)
        return map_model_to_review(review_db)


@router.get("/")
async def fetch_reviews_list(
        current_user: User = Depends(get_current_active_user)):
    """Fetch list of proposals"""
    with session_scope() as s:
        reviews = s.query(models.Review).all()  # type: models.Review
        return list(map(map_model_to_review, reviews))


@router.get("/{oid}")
async def fetch_review(
        oid: int,
        current_user: User = Depends(get_current_active_user)):
    """Fetch list of proposals"""
    with session_scope() as s:
        review_db = s.query(models.Review).filter_by(
            id=oid).first()  # type: models.Review
        if not review_db:
            raise HTTPException(status_code=404,
                                detail="Review not found")
        return map_model_to_proposal(review_db)
