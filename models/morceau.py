from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from models.morceau_genre import morceau_genre  # Assurez-vous que cette importation est ici

class Morceau(Base):
    __tablename__ = "morceaux"

    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String(255), index=True)
    duree = Column(Float)
    artiste_id = Column(Integer, ForeignKey('artistes.id'))
    album_id = Column(Integer, ForeignKey('albums.id'))

    # Relation avec Artiste
    artiste = relationship("Artiste", back_populates="morceaux")
    
    # Relation many-to-many avec Genre
    genres = relationship("Genre", secondary=morceau_genre, back_populates="morceaux")

    # Relation avec Album
    album = relationship("Album", back_populates="morceaux")

    def __repr__(self):
        return f"<Morceau(titre={self.titre}, artiste={self.artiste.nom_artiste}, duree={self.duree})>"
