"""create users table

Revision ID: 3f6b178d7e33
Revises:
Create Date: 2019-05-10 16:03:01.897560
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "3f6b178d7e33"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "user",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(250), nullable=False),
        sa.Column("email", sa.String(50), nullable=False),
        sa.Column("hashed_password", sa.String(100), nullable=False),
        sa.Column("disabled", sa.Boolean, nullable=False),
        sa.Column("role_id", sa.Integer, nullable=False)
    )


def downgrade():
    op.drop_table("user")
