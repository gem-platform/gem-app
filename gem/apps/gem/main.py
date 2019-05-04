from uvicorn import run
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes import debug, auth, users, proposals


app = FastAPI(
    title="GEM",
    description="GBC Environment for meetings")

app.include_router(debug.router, prefix="/debug", tags=["debug"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(proposals.router, prefix="/proposals", tags=["proposals"])

app.add_middleware(CORSMiddleware,
                   allow_origins=['*'],
                   allow_headers=['*'],
                   allow_methods=['*'])


if __name__ == "__main__":
    run("main:app", host="0.0.0.0", port=9000, debug=True, reload=True)
