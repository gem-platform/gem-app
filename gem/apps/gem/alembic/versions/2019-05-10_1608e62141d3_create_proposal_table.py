"""create proposal table

Revision ID: 1608e62141d3
Revises: 3f6b178d7e33
Create Date: 2019-05-10 16:45:44.424288

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1608e62141d3'
down_revision = '3f6b178d7e33'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "proposal",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("title", sa.String(250), nullable=False),
        sa.Column("content", sa.UnicodeText(), nullable=True),
        sa.Column("locked", sa.Boolean, nullable=False, default=False)
    )


def downgrade():
    op.drop_table("proposal")
