from sqlalchemy import Column, Integer, String, Boolean, DateTime, UnicodeText, ForeignKey, Table, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship

Base = declarative_base()


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    email = Column(String(50), nullable=False)
    hashed_password = Column(String(100), nullable=False)
    disabled = Column(Boolean, nullable=False)
    role_id = Column(Integer, ForeignKey("role.id"), nullable=False)
    role = relationship("Role", back_populates="users")
    
    @hybrid_property
    def full_name(self):
        return self.name


class Role(Base):
    __tablename__ = "role"
    id = Column(Integer, primary_key=True)
    name = Column(String(20), nullable=False)
    permissions = Column(JSON, nullable=False)
    users = relationship("User", back_populates="role")


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

