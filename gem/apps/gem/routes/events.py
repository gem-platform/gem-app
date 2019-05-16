from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Schema, validator

from api.event import Event
from api.user import User
from db import models, session_scope
from mappers.event import event2model, model2event

from .auth import get_current_active_user

router = APIRouter()


@router.post("/")
async def create_event(
        event: Event,
        current_user: User = Depends(get_current_active_user)) -> models.Event:
    """Create new event using specified data."""
    with session_scope() as s:
        event_db = event2model(event, s)
        s.add(event_db)
        s.flush()  # save to db to be able to obtain ID for mapping below
        return model2event(event_db)


@router.put("/{oid}")
async def update_event(
        oid: int,
        event: Event,
        current_user: User = Depends(get_current_active_user)):
    """Update proposal"""
    with session_scope() as s:
        event_db = s.query(models.Event).filter_by(
            id=oid).first()  # type: models.Event
        if not event_db:
            raise HTTPException(status_code=404, detail="Event not found")
        event_db.title = event.title
        event_db.agenda = event.agenda
        event_db.start = event.start
        event_db.end = event.end
        # todo: check proposal exists
        # event_db.proposals_id = event.proposals
        return model2event(event_db)


@router.delete("/{oid}")
async def delete_review(
        oid: int,
        current_user: User = Depends(get_current_active_user)):
    """Delete proposal using specified ID."""
    with session_scope() as s:
        event_db = s.query(models.Event).filter_by(
            id=oid).first()  # type: models.Event
        if not event_db:
            raise HTTPException(status_code=404, detail="Event not found")
        s.delete(event_db)
        return model2event(event_db)


@router.get("/")
async def fetch_events_list(
        current_user: User = Depends(get_current_active_user)):
    """Fetch list of proposals"""
    with session_scope() as s:
        events = s.query(models.Event).all()  # type: models.Event
        return list(map(model2event, events))


@router.get("/{oid}")
async def fetch_event(
        oid: int,
        current_user: User = Depends(get_current_active_user)):
    with session_scope() as s:
        event_db = s.query(models.Event).filter_by(
            id=oid).first()  # type: models.Event
        if not event_db:
            raise HTTPException(status_code=404, detail="Event not found")
        return model2event(event_db)
