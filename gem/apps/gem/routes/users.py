from fastapi import APIRouter
from pydantic import BaseModel, Schema

router = APIRouter()

fake_db = {
}

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
    global fake_db
    user.oid = len(fake_db) + 1
    fake_db[user.oid] = user
    return user


@router.put("/")
async def update_user(user: User):
    global fake_db
    fake_db[user.oid] = user
    return user


@router.get("/")
async def fetch_users_list():
    global fake_db
    return list(fake_db.values())
