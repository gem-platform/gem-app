from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Schema

from api.proposal import Proposal
from api.user import User
from db import models, session_scope
from mappers.proposal import map_model_to_proposal, map_proposal_to_model

from .auth import get_current_active_user

router = APIRouter()


@router.post("/")
async def create_proposal(
        proposal: Proposal,
        current_user: User = Depends(get_current_active_user)) -> models.Proposal:
    """Create new proposal using specified data."""
    with session_scope() as s:
        proposal_db = map_proposal_to_model(proposal)
        s.add(proposal_db)
        s.flush()  # save to db to be able to obtain ID for mapping below
        return map_model_to_proposal(proposal_db)


@router.put("/{oid}")
async def update_proposal(
        oid: int,
        proposal: Proposal,
        current_user: User = Depends(get_current_active_user)):
    """Update proposal"""
    with session_scope() as s:
        proposal_db = s.query(models.Proposal).filter_by(
            id=oid).first()  # type: models.Proposal
        if not proposal_db:
            raise HTTPException(status_code=404, detail="Proposal not found")
        if proposal_db.locked:
            raise HTTPException(
                status_code=400, detail="Proposal is locked for modification")
        proposal_db.title = proposal.title
        proposal_db.content = proposal.content
        return map_model_to_proposal(proposal_db)


@router.delete("/{oid}")
async def delete_proposal(
        oid: int,
        current_user: User = Depends(get_current_active_user)):
    """Delete proposal using specified ID."""
    with session_scope() as s:
        proposal_db = s.query(models.Proposal).filter_by(
            id=oid).first()  # type: models.Proposal
        if not proposal_db:
            raise HTTPException(status_code=404, detail="Proposal not found")
        s.delete(proposal_db)
        proposal = map_model_to_proposal(proposal_db)
        return proposal


@router.get("/")
async def fetch_proposals_list(
        current_user: User = Depends(get_current_active_user)):
    """Fetch list of proposals"""
    with session_scope() as s:
        proposals = s.query(models.Proposal).all()  # type: models.Proposal
        return list(map(map_model_to_proposal, proposals))


@router.get("/{oid}")
async def fetch_proposal(
        oid: int,
        current_user: User = Depends(get_current_active_user)):
    """Fetch list of proposals"""
    with session_scope() as s:
        proposal_db = s.query(models.Proposal).filter_by(
            id=oid).first()  # type: models.Proposal
        if not proposal_db:
            raise HTTPException(status_code=404, detail="Proposal not found")
        return map_model_to_proposal(proposal_db)


@router.post("/{oid}/lock")
async def lock_proposal(
        oid: int,
        current_user: User = Depends(get_current_active_user)):
    """Create new proposal using specified data."""
    with session_scope() as s:
        proposal_db = s.query(models.Proposal).filter_by(
            id=oid).first()  # type: models.Proposal
        if not proposal_db:
            raise HTTPException(status_code=404, detail="Proposal not found")
        proposal_db.locked = True
        return {"status": "ok"}
