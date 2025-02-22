"""create model tables

Revision ID: f2af0c3d92ca
Revises: 
Create Date: 2025-01-10 23:02:26.831265

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f2af0c3d92ca'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('movies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('poster_url', sa.String(), nullable=False),
    sa.Column('genre', sa.String(), nullable=False),
    sa.Column('duration', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('release_date', sa.String(), nullable=False),
    sa.Column('streaming_options', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('poster_url'),
    sa.UniqueConstraint('title')
    )
    op.create_table('tv_shows',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('poster_url', sa.String(), nullable=False),
    sa.Column('genre', sa.String(), nullable=False),
    sa.Column('seasons', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('release_date', sa.String(), nullable=False),
    sa.Column('streaming_options', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('poster_url'),
    sa.UniqueConstraint('title')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('movie_watch_events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('movie_id', sa.Integer(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('notes', sa.String(), nullable=True),
    sa.Column('status', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['movie_id'], ['movies.id'], name=op.f('fk_movie_watch_events_movie_id_movies')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_movie_watch_events_user_id_users')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id', 'movie_id', name='no_duplicate_user_and_movie_instance')
    )
    op.create_table('tv_show_watch_events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('tv_show_id', sa.Integer(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('notes', sa.String(), nullable=True),
    sa.Column('status', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['tv_show_id'], ['tv_shows.id'], name=op.f('fk_tv_show_watch_events_tv_show_id_tv_shows')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_tv_show_watch_events_user_id_users')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id', 'tv_show_id', name='no_duplicate_user_and_tv_show_instance')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tv_show_watch_events')
    op.drop_table('movie_watch_events')
    op.drop_table('users')
    op.drop_table('tv_shows')
    op.drop_table('movies')
    # ### end Alembic commands ###
