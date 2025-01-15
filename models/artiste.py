from sqlalchemy import Column, Integer, String, LargeBinary
from sqlalchemy.orm import relationship
from database import Base 

class Artiste(Base):
    __tablename__ = "artistes" 

    id = Column(Integer, primary_key=True, index=True) 
    nom_artiste = Column(String(255), unique=True, index=True)  
    avatar = Column(String(255), nullable=True) 
    biographie = Column(String(1024), nullable=True)
    
    # Relations avec les albums et morceaux
    albums = relationship("Album", back_populates="artiste")
    morceaux = relationship("Morceau", back_populates="artiste")

    def __repr__(self):
        return f"<Artiste(nom_artiste={self.nom_artiste})>"