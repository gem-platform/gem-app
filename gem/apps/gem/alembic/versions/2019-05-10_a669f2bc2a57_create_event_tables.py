"""create event tables

Revision ID: a669f2bc2a57
Revises: 1608e62141d3
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
        sa.Column("agenda", sa.UnicodeText()),
        sa.Column("start", sa.DateTime(timezone=True)),
        sa.Column("end", sa.DateTime(timezone=True))
    )

    op.create_table(
        'event_proposal',
        sa.Column("evnet_id", sa.Integer, sa.ForeignKey(
            "event.id"), primary_key=True),
        sa.Column("proposal_id", sa.Integer, sa.ForeignKey(
            "proposal.id"), primary_key=True)
    )


def downgrade():
    op.drop_table('event')
    op.drop_table('event_proposal')
