from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Schema, validator
from db import session_scope, models
from passlib.context import CryptContext
from mappers.user import map_model_to_user, map_user_to_model
from api.user import User
from auth.role import auth_req

from .auth import get_current_active_user

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()


class ChangePassword(BaseModel):
    password: str = Schema("", title="Password")

    @validator('password')
    def should_be_at_least_6_chars_long(cls, v: str):
        if len(v) < 6:
            raise ValueError('Should be at least 6 characters long')
        return v


@router.post("/")
async def create_user(user: User) -> models.User:
    with session_scope() as s:
        # s.expire_on_commit = False
        user_db = map_user_to_model(user)
        user_db.hashed_password = pwd_context.hash(user.password)
        s.add(user_db)
        s.flush()
        user.oid = user_db.id
        return user


@router.put("/")
async def update_user(user: User):
    with session_scope() as s:
        user_db = s.query(models.User).filter_by(id=user.oid).first()  # type: models.User
        if not user_db:
            return False
        user_db.username = user.username
        user_db.full_name = user.full_name
        user_db.email = user.email
        user_db.disabled = user.disabled
        s.commit()
    return user


@router.delete("/{oid}")
async def delete_user(oid: int):
    with session_scope() as s:
        user_db = s.query(models.User).filter_by(id=oid).first()  # type: models.User
        if not user_db:
            return False
        s.delete(user_db)
        user = map_model_to_user(user_db)
        return user


@router.get("/")
async def fetch_users_list():
    with session_scope() as s:
        users = s.query(models.User).all()  # type: [models.User]
        user_list = []
        for user in users:
            user_list.append(map_model_to_user(user))
        return user_list


@router.put("/{oid}/changePassword")
async def change_password(
        oid: int, change: ChangePassword,
        current_user: User = Depends(get_current_active_user)):
    with session_scope() as s:
        user_db = s.query(models.User).filter_by(id=oid).first()  # type: models.User
        if not user_db:
            raise HTTPException(status_code=404, detail="User not found")
        user_db.hashed_password = pwd_context.hash(change.password)
        s.commit()
    return {"status": "ok"}
