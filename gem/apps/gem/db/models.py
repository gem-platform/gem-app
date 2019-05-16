from sqlalchemy import Column, Integer, String, Boolean, DateTime, UnicodeText, ForeignKey, Table
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


event_proposals = Table(
    'event_proposal', Base.metadata,
    Column('event_id', Integer, ForeignKey('event.id')),
    Column('proposal_id', Integer, ForeignKey('proposal.id'))
)


class Proposal(Base):
    __tablename__ = "proposal"
    id = Column(Integer, primary_key=True)
    title = Column(String(250), nullable=False)
    content = Column(UnicodeText(), nullable=True)
    locked = Column(Boolean, nullable=False, default=False)
    events = relationship("Event", secondary=event_proposals)


class Event(Base):
    __tablename__ = "event"
    id = Column(Integer, primary_key=True)
    type = Column(String(50))
    title = Column(String(128))
    agenda = Column(UnicodeText())
    start = Column(DateTime(timezone=True))
    end = Column(DateTime(timezone=True))
    proposals = relationship("Proposal", secondary=event_proposals)
