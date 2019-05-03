from sqlalchemy import Column, Integer, String, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(250), nullable=False)
    full_name = Column(String(250), nullable=True)
    email = Column(String(50), nullable=False)
    hashed_password = Column(String(100), nullable=False)
    disabled = Column(Boolean, nullable=False)


class Role(Base):
    __tablename__ = 'role'
    id = Column(Integer, primary_key=True)
    name = Column(String(20), nullable=False)
    permissions = Column(JSON, nullable=False)
