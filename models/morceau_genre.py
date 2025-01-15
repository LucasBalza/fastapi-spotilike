from sqlalchemy import Table, Column, Integer, ForeignKey
from database import Base

morceau_genre = Table(
    'morceau_genre', Base.metadata,
    Column('morceau_id', Integer, ForeignKey('morceaux.id', ondelete="CASCADE"), primary_key=True),
    Column('genre_id', Integer, ForeignKey('genres.id', ondelete="CASCADE"), primary_key=True)
)
