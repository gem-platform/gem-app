"""create law table

Revision ID: 8d36af560ff5
Revises: ec461e83dbfa
Create Date: 2019-06-30 17:30:41.502716

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8d36af560ff5'
down_revision = 'ec461e83dbfa'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "law",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("title", sa.String(250), nullable=False),
        sa.Column("content", sa.UnicodeText(), nullable=True),
        sa.Column("locked", sa.Boolean, nullable=False, default=False)
    )


def downgrade():
    op.drop_table("law")