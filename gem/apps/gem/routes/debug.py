import sys
from fastapi import APIRouter

from db import recreate_db

router = APIRouter()


@router.post("/wipeout")
async def debug_wipeout(seed: bool = True):
    recreate_db(seed)
    return {"done": True}


@router.get("/stop")
async def debug_stop(seed: bool = True):
    sys.exit()
