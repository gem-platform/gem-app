"""create role table

Revision ID: 8f2475c20488
Revises: a669f2bc2a57
Create Date: 2019-05-18 12:35:08.928551

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "8f2475c20488"
down_revision = "a669f2bc2a57"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "role",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(20), nullable=False),
        sa.Column("permissions", sa.JSON, nullable=False)
    )


def downgrade():
    op.drop_table("role")
