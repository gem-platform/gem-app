"""seed users

Revision ID: ec461e83dbfa
Revises: 51eef5393376
Create Date: 2019-05-18 13:03:29.122415

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import orm
from db.models import User


# revision identifiers, used by Alembic.
revision = "ec461e83dbfa"
down_revision = "51eef5393376"
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    session = orm.Session(bind=bind)

    session.add_all([
        User(id=0,
             username="admin",
             full_name="Admin",
             email="admin@example.com",
             hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
             disabled=False,
             role_id=0),
        User(id=1,
             username="secretary",
             full_name="Secretary",
             email="secretary@example.com",
             hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
             disabled=False,
             role_id=1)
    ])

    session.commit()


def downgrade():
    bind = op.get_bind()
    session = orm.Session(bind=bind)

    session.query(User).filter(User.id == 0).delete()
    session.query(User).filter(User.id == 1).delete()

    session.commit()
