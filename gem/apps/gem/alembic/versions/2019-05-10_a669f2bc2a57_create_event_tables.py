"""create event tables

Revision ID: a669f2bc2a57
Revises: 3f6b178d7e33
Create Date: 2019-05-10 16:50:59.379318

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a669f2bc2a57'
down_revision = '1608e62141d3'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'event',
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("type", sa.String(50)),
        sa.Column("title", sa.String(128)),
        sa.Column("start", sa.DateTime()),
        sa.Column("end", sa.DateTime())
    )

    op.create_table(
        'meeting',
        sa.Column("id", sa.Integer, sa.ForeignKey(
            "event.id"), primary_key=True),
        sa.Column("agenda", sa.UnicodeText())
    )

    op.create_table(
        'review',
        sa.Column("id", sa.Integer, sa.ForeignKey(
            "event.id"), primary_key=True),
        sa.Column("proposal_id", sa.Integer, sa.ForeignKey("proposal.id"))
    )


def downgrade():
    op.drop_table('review')
    op.drop_table('meeting')
    op.drop_table('event')
