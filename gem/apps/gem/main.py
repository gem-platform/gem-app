from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes import debug, auth


app = FastAPI()
app.include_router(debug.router, prefix="/debug", tags=["debug"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])

app.add_middleware(CORSMiddleware,
                   allow_origins=['*'],
                   allow_headers=['*'],
                   allow_methods=['*'])
