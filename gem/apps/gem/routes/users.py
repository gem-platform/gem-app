from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

fake_db = {
}

class User(BaseModel):
    oid: int
    username: str
    email: str = None
    full_name: str = None
    disabled: bool = None


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
