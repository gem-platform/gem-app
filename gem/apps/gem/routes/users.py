from fastapi import APIRouter
from pydantic import BaseModel, Schema

from db import fake_db 

router = APIRouter()


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


@router.post("/")
async def create_user(user: User):
    user.oid = len(fake_db) + 1
    fake_db[user.oid] = user
    return user


@router.put("/")
async def update_user(user: User):
    fake_db[user.oid] = user
    return user


@router.delete("/{oid}")
async def delete_user(oid: int):
    otd = fake_db[oid]
    del fake_db[oid]
    return otd
    

@router.get("/")
async def fetch_users_list():
    return list(fake_db.values())
