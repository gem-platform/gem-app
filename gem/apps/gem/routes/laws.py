from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Schema

from api.law import Law
from db import models, session_scope
from mappers.law import map_model_to_law, map_law_to_model

from .auth import get_current_active_user

router = APIRouter()


@router.post("/")
async def create_law(
        law: Law,
        current_user: models.User = Depends(get_current_active_user)) -> models.Law:
    """Create new law using specified data."""
    with session_scope() as s:
        law_db = map_law_to_model(law)
        s.add(law_db)
        s.flush()  # save to db to be able to obtain ID for mapping below
        return map_model_to_law(law_db)


@router.put("/{oid}")
async def update_law(
        oid: int,
        law: Law,
        current_user: models.User = Depends(get_current_active_user)):
    """Update law"""
    with session_scope() as s:
        law_db = s.query(models.Law).filter_by(
            id=oid).first()  # type: models.Law
        if not law_db:
            raise HTTPException(status_code=404, detail="Law not found")
        if law_db.locked:
            raise HTTPException(
                status_code=400, detail="Law is locked for modification")
        law_db.title = law.title
        law_db.content = law.content
        return map_model_to_law(law_db)


@router.delete("/{oid}")
async def delete_law(
        oid: int,
        current_user: models.User = Depends(get_current_active_user)):
    """Delete law using specified ID."""
    with session_scope() as s:
        law_db = s.query(models.Law).filter_by(
            id=oid).first()  # type: models.Law
        if not law_db:
            raise HTTPException(status_code=404, detail="Law not found")
        s.delete(law_db)
        law = map_model_to_law(law_db)
        return law


@router.get("/")
async def fetch_laws_list(
        current_user: models.User = Depends(get_current_active_user)):
    """Fetch list of laws"""
    with session_scope() as s:
        laws = s.query(models.Law).all()  # type: models.Law
        return list(map(map_model_to_law, laws))


@router.get("/{oid}")
async def fetch_law(
        oid: int,
        current_user: models.User = Depends(get_current_active_user)):
    """Fetch list of laws"""
    with session_scope() as s:
        law_db = s.query(models.Law).filter_by(
            id=oid).first()  # type: models.Law
        if not law_db:
            raise HTTPException(status_code=404, detail="Law not found")
        return map_model_to_law(law_db)


@router.post("/{oid}/lock")
async def lock_law(
        oid: int,
        current_user: models.User = Depends(get_current_active_user)):
    """Create new law using specified data."""
    with session_scope() as s:
        law_db = s.query(models.Law).filter_by(
            id=oid).first()  # type: models.Law
        if not law_db:
            raise HTTPException(status_code=404, detail="Law not found")
        law_db.locked = True
        return {"status": "ok"}
