from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .config import DATABASE_URI
from .models import Base, User

engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)


def recreate_db():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    add_default_user()


def add_default_user():
    with session_scope() as s:
        user = User(
            id=0,
            username='Secretary',
            full_name='Secretary das',
            email='johndoe@example.com',
            hashed_password='$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
            disabled=False,
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


fake_db = {

}
