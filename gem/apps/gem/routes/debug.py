from fastapi import APIRouter

router = APIRouter()

@router.post("/wipeout")
async def debug_wipeout(data: dict):
    global fake_users_db
    fake_users_db = data
    print("Wipedout")
    return {"done": True}