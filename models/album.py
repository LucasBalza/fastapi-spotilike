from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from database import Base
from datetime import date

class Album(Base):
    __tablename__ = "albums"
    
    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String(255))  # On spécifie une longueur maximale de 255 caractères
    pochette = Column(String(255))  # Idem ici
    date_sortie = Column(Date)
    
    # Relation avec l'artiste
    artiste_id = Column(Integer, ForeignKey('artistes.id'))
    artiste = relationship("Artiste", back_populates="albums")

    # Relation inverse avec Morceau
    morceaux = relationship("Morceau", back_populates="album")
