"""resolve errors

Revision ID: 4f62e0f43c1f
Revises: efb2df8ba9f6
Create Date: 2024-07-23 13:20:51.213996

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4f62e0f43c1f'
down_revision = 'efb2df8ba9f6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('collections', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('collections', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.BLOB(), nullable=True))

    # ### end Alembic commands ###
