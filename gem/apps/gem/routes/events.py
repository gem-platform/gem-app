from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.event import Event, EventType
from auth.role import AuthenticatedUser
from db import get_db, models
from mappers.event import model2event, event2model

user_with_users_access = AuthenticatedUser(permissions=["user_list"])
router = APIRouter()


def __get_event(session, oid):
    event_db = session.query(models.Event).filter_by(id=oid).first()
    if not event_db:
        raise HTTPException(status_code=404, detail="Event not found")
    return event_db


@router.post(
    "/",
    summary="Create a new event",
    response_model=Event)
async def create_event(
        event: Event,
        current_user: models.User = Depends(user_with_users_access),
        session: Session = Depends(get_db)) -> Event:
    """Create a new user."""
    event_db = event2model(event, session)
    session.add(event_db)
    session.commit()
    return model2event(event_db)


@router.put(
    "/{oid}",
    summary="Update event",
    response_model=Event)
async def update_event(
        oid: int,
        event: Event,
        current_user: models.User = Depends(user_with_users_access),
        session: Session = Depends(get_db)) -> Event:
    """Update event."""
    event_db = __get_event(session, oid)
    event2model(event, session, model = event_db)
    session.commit()
    return model2event(event_db)


@router.delete(
    "/{oid}",
    summary="Delete event")
async def delete_event(
        oid: int,
        current_user: models.User = Depends(user_with_users_access),
        session: Session = Depends(get_db)):
    """Delete user."""
    event_db = __get_event(session, oid)
    session.delete(event_db)
    session.commit()
    return model2event(event_db)


@router.get("/")
async def fetch_events_list(
        current_user: models.User = Depends(user_with_users_access),
        session: Session = Depends(get_db)):
    """Get list of users."""
    users = session.query(models.Event).all()  # type: [models.User]
    return list(map(model2event, users))


@router.get("/{oid}")
async def fetch_event(
        oid: int,
        current_user: models.User = Depends(user_with_users_access),
        session: Session = Depends(get_db)):
    """Get user."""
    user = __get_event(session, oid)
    return model2event(user)
