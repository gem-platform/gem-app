"""create users table

Revision ID: 3f6b178d7e33
Revises: 
Create Date: 2019-05-10 16:03:01.897560

"""
from alembic import op
import sqlalchemy as sa

from sqlalchemy import Column, Integer, String, Boolean

# revision identifiers, used by Alembic.
revision = "3f6b178d7e33"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "user",
        sa.Column("id", Integer, primary_key=True),
        sa.Column("name", String(250), nullable=False),
        sa.Column("email", String(50), nullable=False),
        sa.Column("hashed_password", String(100), nullable=False),
        sa.Column("disabled", Boolean, nullable=False),
        sa.Column("role_id", Integer, nullable=False)
    )


def downgrade():
    op.drop_table("user")
