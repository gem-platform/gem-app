from fastapi import APIRouter

from db import recreate_db

router = APIRouter()


@router.post("/wipeout")
async def debug_wipeout(seed: bool = True):
    '''
    post request on localhost:9000/debug/wipeout
    :param seed:
    :return:
    '''
    recreate_db(seed)
    return {"done": True}
