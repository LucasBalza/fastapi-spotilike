from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base
from models.morceau_genre import morceau_genre  # Assurez-vous que cette importation est ici

class Genre(Base):
    __tablename__ = "genres"

    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String(255), index=True)
    description = Column(String(1024))
    
    # Relation many-to-many avec Morceau
    morceaux = relationship("Morceau", secondary=morceau_genre, back_populates="genres")

    def __repr__(self):
        return f"<Genre(titre={self.titre}, description={self.description})>"

