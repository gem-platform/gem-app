from fastapi import APIRouter, Depends, HTTPException
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from api.user import ChangePassword, UserIn, UserOut, UserCreate
from auth.role import AuthenticatedUser
from db import get_db, models
from mappers.user import model2user, user2model

user_with_users_access = AuthenticatedUser(permissions=["user_list"])
router = APIRouter()


def __get_user(session, oid):
    user_db = session.query(models.User).filter_by(id=oid).first()
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")
    return user_db


@router.post(
    "/",
    summary="Create a new user",
    response_model=UserOut)
async def create_user(
        user: UserCreate,
        current_user: models.User = Depends(user_with_users_access),
        session: Session = Depends(get_db)) -> UserOut:
    """Create a new user."""
    user_db = user2model(user)
    session.add(user_db)
    session.commit()
    return model2user(user_db)


@router.put(
    "/{oid}",
    summary="Update user",
    response_model=UserOut)
async def update_user(
        oid: int,
        user: UserIn,
        current_user: models.User = Depends(user_with_users_access),
        session: Session = Depends(get_db)) -> UserOut:
    """Update user."""
    user_db = __get_user(session, oid)
    user2model(user, user_db)
    session.commit()
    return model2user(user_db)


@router.delete(
    "/{oid}",
    summary="Delete user")
async def delete_user(
        oid: int,
        current_user: models.User = Depends(user_with_users_access),
        session: Session = Depends(get_db)):
    """Delete user."""
    user_db = __get_user(session, oid)
    session.delete(user_db)
    session.commit()
    return model2user(user_db)


@router.get("/")
async def fetch_users_list(
        current_user: models.User = Depends(user_with_users_access),
        session: Session = Depends(get_db)):
    """Get list of users."""
    users = session.query(models.User).all()  # type: [models.User]
    return list(map(model2user, users))


@router.get("/{oid}")
async def fetch_user(
        oid: int,
        current_user: models.User = Depends(user_with_users_access),
        session: Session = Depends(get_db)):
    """Get user."""
    user = __get_user(session, oid)
    return model2user(user)


@router.put("/{oid}/changePassword")
async def change_password(
        oid: int,
        change: ChangePassword,
        current_user: models.User = Depends(user_with_users_access),
        session: Session = Depends(get_db)):
    """Change password."""
    user_db = __get_user(session, oid)
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    user_db.hashed_password = pwd_context.hash(change.password)
    session.commit()
    return {"status": "ok"}
