from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth.role import AuthenticatedUser
from db import db_session
from db.models import Event, Proposal, User
from forms.event import EventIn, EventOut
from mappers.event import event2model, model2event

router = APIRouter()
user_with_admin_access = AuthenticatedUser(permissions=["user_list"])

__MSG_NOT_FOUND = "Event not found"


def __get_event(session, oid) -> Event:
    event_db = session.query(Event).filter_by(id=oid).first()
    if not event_db:
        raise HTTPException(status_code=404, detail=__MSG_NOT_FOUND)
    return event_db


@router.post(
    "/",
    summary="Create a new event",
    response_model=EventOut)
async def create_event(
        event: EventIn,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)) -> EventOut:
    """Create new event using specified data."""
    event_db = event2model(event, session)
    session.add(event_db)
    session.commit()  # save to db to be able to obtain ID for mapping below
    return model2event(event_db)


@router.put(
    "/{oid}",
    summary="Update event",
    response_model=EventOut)
async def update_event(
        oid: int,
        event: EventIn,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)) -> EventOut:
    """Update event"""
    event_db = __get_event(session, oid)
    event_db.title = event.title
    event_db.agenda = event.agenda
    event_db.start = event.start
    event_db.end = event.end

    # todo: check proposal exists
    proposals = session.query(Proposal).filter(
        Proposal.id.in_(event.proposals)).all()
    event_db.proposals.extend(proposals)

    session.commit()
    return model2event(event_db)


@router.delete(
    "/{oid}",
    summary="Delete event")
async def delete_event(
        oid: int,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Delete event using specified ID."""
    event_db = __get_event(session, oid)
    session.delete(event_db)
    event = model2event(event_db)
    session.commit()
    return event


@router.get(
    "/",
    summary="Fetch list of events",
    response_model=List[EventOut])
async def fetch_events_list(
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)):
    """Fetch list of events"""
    events = session.query(Event).all()  # type: [Event]
    return list(map(model2event, events))


@router.get(
    "/{oid}",
    summary="Fetch one proposal",
    response_model=EventOut)
async def fetch_event(
        oid: int,
        user: User = Depends(user_with_admin_access),
        session: Session = Depends(db_session)) -> EventOut:
    """Fetch list of events"""
    event_db = __get_event(session, oid)
    return model2event(event_db)
