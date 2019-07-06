from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth.role import AuthenticatedUser
from db import db_session
from db.models import Law, User
from forms.law import LawIn, LawOut
from mappers.law import law2model, model2law

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
    response_model=LawOut)
async def create_law(
        law: LawIn,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)) -> LawOut:
    """Create new law using specified data."""
    law_db = law2model(law)
    session.add(law_db)
    session.commit()  # save to db to be able to obtain ID for mapping below
    return model2law(law_db)


@router.put(
    "/{oid}",
    summary="Update law",
    response_model=LawOut)
async def update_law(
        oid: int,
        law: LawIn,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Update law"""
    law_db = __get_law(session, oid)
    law_db.title = law.title
    law_db.content = law.content
    session.commit()
    return model2law(law_db)


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
    law = model2law(law_db)
    session.commit()
    return law


@router.get(
    "/",
    summary="Fetch list of laws",
    response_model=List[LawOut])
async def fetch_laws_list(
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Fetch list of laws"""
    laws = session.query(Law).all()  # type: [Law]
    return list(map(model2law, laws))


@router.get(
    "/{oid}",
    summary="Fetch one proposal",
    response_model=LawOut)
async def fetch_law(
        oid: int,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Fetch list of laws"""
    law_db = __get_law(session, oid)
    return model2law(law_db)
