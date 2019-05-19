from uvicorn import run
from starlette.middleware.cors import CORSMiddleware

from fastapi import Depends, FastAPI
from starlette.requests import Request
from starlette.responses import Response
from routes import debug, auth, users, roles, proposals, events
from db import SessionLocal


app = FastAPI(
    title="GEM",
    description="GBC Environment for meetings")

app.include_router(debug.router, prefix="/debug", tags=["debug"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(proposals.router, prefix="/proposals", tags=["proposals"])
app.include_router(events.router, prefix="/events", tags=["events"])
app.include_router(roles.router, prefix="/roles", tags=["roles"])

app.add_middleware(CORSMiddleware,
                   allow_origins=['*'],
                   allow_headers=['*'],
                   allow_methods=['*'])


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


if __name__ == "__main__":
    run("main:app", host="0.0.0.0", port=9000, debug=True, reload=True)
