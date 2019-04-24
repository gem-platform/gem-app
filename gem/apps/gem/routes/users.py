from fastapi import APIRouter
from pydantic import BaseModel, Schema
from db import session_scope
from db import models


router = APIRouter()


# TODO: Should be checking, that user can't change data any other users without permission

class User(BaseModel):
    oid: int
    username: str
    email: str
    full_name: str = Schema(
        "",
        title="User's full name",
        min_length=3, max_length=64
    )
    disabled: bool


def map_model_to_user(model: models.User) -> User:
    user = User(
        oid=model.id,
        username=model.username,
        full_name=model.full_name,
        email=model.email,
        disabled=model.disabled
    )
    return user


def map_user_to_model(user: User) -> models.User:
    model = models.User(
        username=user.username,
        full_name=user.full_name,
        email=user.email,
        disabled=user.disabled
    )
    if user.oid > 0 :
        model.id = user.oid,
    return model


@router.post("/")
async def create_user(user: User) -> models.User:
    with session_scope() as s:
        # s.expire_on_commit = False
        user_db = map_user_to_model(user)
        user_db.hashed_password = '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW'
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
    return oid



@router.get("/")
async def fetch_users_list():
    with session_scope() as s:
        users = s.query(models.User).all()  # type: models.User
        user_list = []
        for user in users:
            user_list.append(map_model_to_user(user))
        return user_list
