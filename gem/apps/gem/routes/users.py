from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Schema, validator
from db import models, get_db
from passlib.context import CryptContext
from mappers.user import map_model_to_user, map_user_to_model
from api.user import User
from auth.role import RoleChecker
from .auth import get_current_user
from sqlalchemy.orm import Session
from starlette.status import HTTP_403_FORBIDDEN

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()


class ChangePassword(BaseModel):
    password: str = Schema("", title="Password")

    @validator("password")
    def should_be_at_least_6_chars_long(cls, v: str):
        if len(v) < 6:
            raise ValueError("Should be at least 6 characters long")
        return v


@router.post("/")
async def create_user(user: User, s: Session = Depends(get_db)) -> models.User:
    try:
        user_db = map_user_to_model(user)
        user_db.hashed_password = pwd_context.hash(user.password)
        s.add(user_db)
        s.commit()
        user.oid = user_db.id
    except Exception as e:
        # todo: log exception
        print(e)
        raise HTTPException(status_code=500, detail="Unable to create user")
    return user


@router.put("/")
async def update_user(user: User, s: Session = Depends(get_db)):
    user_db = s.query(models.User).filter_by(
        id=user.oid).first()  # type: models.User
    if not user_db:
        return False
    user_db.name = user.name
    user_db.email = user.email
    user_db.disabled = user.disabled
    s.commit()
    return user


@router.delete("/{oid}")
async def delete_user(oid: int, s: Session = Depends(get_db)):
    user_db = s.query(models.User).filter_by(
        id=oid).first()  # type: models.User
    if not user_db:
        return False
    s.delete(user_db)
    s.commit()
    user = map_model_to_user(user_db)
    return user


@router.get("/")
async def fetch_users_list(
        is_permitted: bool = Depends(RoleChecker(permissions=["user_list"])),
        s: Session = Depends(get_db)):
    users = s.query(models.User).all()  # type: [models.User]
    return list(map(map_model_to_user, users))


@router.put("/{oid}/changePassword")
async def change_password(
        oid: int, change: ChangePassword,
        s: Session = Depends(get_db),
        current_user: models.User = Depends(get_current_user)):
    user_db = s.query(models.User).filter_by(
        id=oid).first()  # type: models.User
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")
    user_db.hashed_password = pwd_context.hash(change.password)
    s.commit()
    return {"status": "ok"}
