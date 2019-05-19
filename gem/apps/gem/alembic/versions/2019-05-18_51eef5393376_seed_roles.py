"""seed roles

Revision ID: 51eef5393376
Revises: 8f2475c20488
Create Date: 2019-05-18 12:40:34.570220

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import orm
from db.models import Role

# revision identifiers, used by Alembic.
revision = "51eef5393376"
down_revision = "8f2475c20488"
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    session = orm.Session(bind=bind)

    session.add_all([
        Role(id=0, name="Guest", permissions={}),
        Role(id=1, name="Admin", permissions={"all": 1}),
        Role(id=2, name="Secretary", permissions={
             "user_list": 1, "user_create": 1, "user_edit": 1}),
        Role(id=3, name="GBC", permissions={
             "user_list": 1, "user_create": 1}),
    ])

    session.commit()


def downgrade():
    bind = op.get_bind()
    session = orm.Session(bind=bind)

    session.query(Role).filter(Role.id == 0).delete()
    session.query(Role).filter(Role.id == 1).delete()
    session.query(Role).filter(Role.id == 2).delete()
    session.query(Role).filter(Role.id == 3).delete()

    session.commit()
