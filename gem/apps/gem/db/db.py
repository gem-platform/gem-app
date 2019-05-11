from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .config import DATABASE_URI
from .models import Base, User, Role
from auth.const import ADMIN, Secretary, GBC, GUEST

engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)


def recreate_db():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    add_default_roles()
    add_default_user()


def add_default_roles():
    with session_scope() as s:
        role = Role(
            name='admin',
            permissions={"all": 1},
            rid=ADMIN,
        )
        s.add(role)
        role = Role(
            name='guest',
            permissions={},
            rid=GUEST,
        )
        s.add(role)
        role = Role(
            name='secretary',
            permissions={"user_list": 1, "user_create": 1, "user_edit": 1},
            rid=Secretary,
        )
        s.add(role)
        role = Role(
            name='gbc',
            permissions={"user_list": 1, "user_create": 1},
            rid=GBC,
        )
        s.add(role)

def add_default_user():
    with session_scope() as s:
        user = User(
            username='admin',
            full_name='Admin',
            email='admin@example.com',
            hashed_password='$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
            disabled=False,
            role_id=1,
        )
        s.add(user)

        user = User(
            username='secretary',
            full_name='John Doe',
            email='johndoe@example.com',
            hashed_password='$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
            disabled=False,
            role_id=3,
        )
        s.add(user)


@contextmanager
def session_scope():
    session = Session()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
