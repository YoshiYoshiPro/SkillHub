"""create users table

Revision ID: ce10b283ab3b
Revises:
Create Date: 2023-09-05 17:16:26.538060+09:00

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = 'ce10b283ab3b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
       'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('login_id', sa.String(50), nullable=False),
        sa.Column('password', sa.Text(), nullable=False),
   )


def downgrade():
    op.drop_table('users')
