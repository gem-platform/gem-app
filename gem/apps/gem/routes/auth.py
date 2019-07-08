from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, FastAPI, HTTPException, Security
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt import PyJWTError, decode, encode
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.status import HTTP_403_FORBIDDEN

from api.user import UserOut
from db import get_db, models
from mappers.user import model2user

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
TOKEN_SUBJECT = "access"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    username: str = None


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(s: Session, username: str):
    s.expire_on_commit = False
    return s.query(models.User).filter_by(name=username).first()


def authenticate_user(s: Session, username: str, password: str) -> models.User:
    user = get_user(s, username)
    return user if user and verify_password(password, user.hashed_password) else False


def create_access_token(*, data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta if expires_delta else timedelta(minutes=15)
    to_encode.update({"exp": expire, "sub": TOKEN_SUBJECT})
    encoded_jwt = encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Security(oauth2_scheme), s: Session = Depends(get_db)) -> models.User:
    try:
        payload = decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        token_data = TokenPayload(**payload)
    except PyJWTError:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user = get_user(s, username=token_data.username)
    return user if user else None


async def get_current_active_user(current_user: models.User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.post("/token", response_model=Token)
async def route_login_access_token(form_data: OAuth2PasswordRequestForm = Depends(),
                                   s: Session = Depends(get_db)):
    user = authenticate_user(s, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=400, detail="credentials.incorrect")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": user.name}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserOut)
async def read_users_me(current_user: models.User = Depends(get_current_active_user)):
    return model2user(current_user)
