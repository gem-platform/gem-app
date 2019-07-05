from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .config import DATABASE_URI
from .models import Base, User, Role
from starlette.requests import Request

engine = create_engine(DATABASE_URI)
SessionLocal = sessionmaker(bind=engine)


def recreate_db():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    add_default_roles()
    add_default_user()


def add_default_roles():
    with session_scope() as s:
        s.add_all([
            Role(
                id=0,
                name="Guest",
                permissions={}
            ),
            Role(
                id=1,
                name="Admin",
                permissions={"all": 1}
            ),
            Role(
                id=2,
                name="Secretary",
                permissions={"user_list": 1, "user_create": 1, "user_edit": 1}
            ),
            Role(
                id=3,
                name="GBC",
                permissions={"user_list": 1, "user_create": 1}
            )
        ])


def add_default_user():
    with session_scope() as s:
        user = User(
            name="admin",
            email="admin@example.com",
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
            disabled=False,
            role_id=1,
        )
        s.add(user)

        user = User(
            name="Secretary",
            email="johndoe@example.com",
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
            disabled=False,
            role_id=2,
        )
        s.add(user)


# Dependency
def db_session(request: Request):
    return request.state.db


@contextmanager
def session_scope():
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
