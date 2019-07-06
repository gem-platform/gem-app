from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth.role import AuthenticatedUser
from db import db_session
from db.models import Proposal, User
from forms.proposal import ProposalIn, ProposalOut
from mappers.proposal import map_model_to_proposal, map_proposal_to_model

router = APIRouter()
user_with_admin_access = AuthenticatedUser(permissions=["user_list"])

__MSG_NOT_FOUND = "Proposal not found"
__MSG_IS_LOCKED = "Proposal is locked for modification"


def __get_proposal(session, oid) -> Proposal:
    proposal_db = session.query(Proposal).filter_by(id=oid).first()
    if not proposal_db:
        raise HTTPException(status_code=404, detail=__MSG_NOT_FOUND)
    return proposal_db


@router.post(
    "/",
    summary="Create a new proposals",
    response_model=ProposalOut)
async def create_proposal(
        proposal: ProposalIn,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)) -> ProposalOut:
    """Create new proposal using specified data."""
    proposal_db = map_proposal_to_model(proposal)
    session.add(proposal_db)
    session.commit()  # save to db to be able to obtain ID for mapping below
    return map_model_to_proposal(proposal_db)


@router.put(
    "/{oid}",
    summary="Update proposal",
    response_model=ProposalOut)
async def update_proposal(
        oid: int,
        proposal: ProposalIn,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Update proposal"""
    proposal_db = __get_proposal(session, oid)
    if proposal_db.locked:
        raise HTTPException(status_code=400, detail=__MSG_IS_LOCKED)
    proposal_db.title = proposal.title
    proposal_db.content = proposal.content
    return map_model_to_proposal(proposal_db)


@router.delete(
    "/{oid}",
    summary="Delete proposal")
async def delete_proposal(
        oid: int,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Delete proposal using specified ID."""
    proposal_db = __get_proposal(session, oid)
    session.delete(proposal_db)
    proposal = map_model_to_proposal(proposal_db)
    session.commit()
    return proposal


@router.get(
    "/",
    summary="Fetch list of proposals",
    response_model=List[ProposalOut])
async def fetch_proposals_list(
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Fetch list of proposals"""
    proposals = session.query(Proposal).all()  # type: [Proposal]
    return list(map(map_model_to_proposal, proposals))


@router.get(
    "/{oid}",
    summary="Fetch one proposal",
    response_model=ProposalOut)
async def fetch_proposal(
        oid: int,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)) -> ProposalOut:
    """Fetch list of proposals"""
    proposal_db = __get_proposal(session, oid)
    return map_model_to_proposal(proposal_db)


@router.post(
    "/{oid}/lock",
    summary="Lock proposal for modification")
async def lock_proposal(
        oid: int,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Locks proposal for modification."""
    proposal_db = __get_proposal(session, oid)
    proposal_db.locked = True
    session.commit()
    return {"status": "ok"}
