from sqlalchemy import Column, Integer, String, Boolean, DateTime, UnicodeText, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    username = Column(String(250), nullable=False)
    full_name = Column(String(250), nullable=True)
    email = Column(String(50), nullable=False)
    hashed_password = Column(String(100), nullable=False)
    disabled = Column(Boolean, nullable=False)


class Proposal(Base):
    __tablename__ = "proposal"
    id = Column(Integer, primary_key=True)
    title = Column(String(250), nullable=False)
    content = Column(UnicodeText(), nullable=True)
    locked = Column(Boolean, nullable=False, default=False)


class Event(Base):
    __tablename__ = "event"
    id = Column(Integer, primary_key=True)
    type = Column(String(50))
    title = Column(String(128))
    start = Column(DateTime())
    end = Column(DateTime())

    __mapper_args__ = {
        "polymorphic_identity": "event",
        "polymorphic_on": type
    }


class Meeting(Event):
    __tablename__ = "meeting"
    id = Column(Integer, ForeignKey("event.id"), primary_key=True)
    agenda = Column(UnicodeText())

    __mapper_args__ = {
        "polymorphic_identity": "meeting",
    }


class Review(Event):
    __tablename__ = "review"
    id = Column(Integer, ForeignKey("event.id"), primary_key=True)

    proposal_id = Column(Integer, ForeignKey("proposal.id"))
    proposal = relationship("Proposal")

    __mapper_args__ = {
        "polymorphic_identity": "review",
    }
