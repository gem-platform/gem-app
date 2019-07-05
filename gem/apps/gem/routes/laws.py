from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth.role import AuthenticatedUser
from db import db_session
from db.models import Law, User
from forms.law import LawForm
from mappers.law import map_law_to_model, map_model_to_law

router = APIRouter()
user_with_admin_access = AuthenticatedUser(permissions=["user_list"])

__MSG_NOT_FOUND = "Law not found"


def __get_law(session, oid) -> Law:
    law_db = session.query(Law).filter_by(id=oid).first()
    if not law_db:
        raise HTTPException(status_code=404, detail=__MSG_NOT_FOUND)
    return law_db


@router.post(
    "/",
    summary="Create a new law",
    response_model=LawForm)
async def create_law(
        law: LawForm,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)) -> LawForm:
    """Create new law using specified data."""
    law_db = map_law_to_model(law)
    session.add(law_db)
    session.commit()  # save to db to be able to obtain ID for mapping below
    return map_model_to_law(law_db)


@router.put(
    "/{oid}",
    summary="Update law",
    response_model=LawForm)
async def update_law(
        oid: int,
        law: LawForm,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Update law"""
    law_db = __get_law(session, oid)
    law_db.title = law.title
    law_db.content = law.content
    return map_model_to_law(law_db)


@router.delete(
    "/{oid}",
    summary="Delete law")
async def delete_law(
        oid: int,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Delete law using specified ID."""
    law_db = __get_law(session, oid)
    session.delete(law_db)
    law = map_model_to_law(law_db)
    session.commit()
    return law


@router.get(
    "/",
    summary="Fetch list of laws",
    response_model=List[LawForm])
async def fetch_laws_list(
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Fetch list of laws"""
    laws = session.query(Law).all()  # type: [Law]
    return list(map(map_model_to_law, laws))


@router.get(
    "/{oid}",
    summary="Fetch one proposal",
    response_model=LawForm)
async def fetch_law(
        oid: int,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Fetch list of laws"""
    law_db = __get_law(session, oid)
    return map_model_to_law(law_db)


@router.post(
    "/{oid}/lock",
    summary="Lock proposal for modification")
async def lock_law(
        oid: int,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Locks proposal for modification."""
    law_db = __get_law(session, oid)
    law_db.locked = True
    session.commit()
    return {"status": "ok"}
