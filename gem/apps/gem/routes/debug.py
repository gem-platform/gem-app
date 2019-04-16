from fastapi import APIRouter

from db import fake_db

router = APIRouter()


@router.post("/wipeout")
async def debug_wipeout(data: dict):
    fake_db.clear()
    print("Wipedout")
    return {"done": True}
