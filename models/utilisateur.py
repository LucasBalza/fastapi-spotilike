from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Utilisateur(Base):
    __tablename__ = "utilisateurs"

    id = Column(Integer, primary_key=True, index=True)
    nom_utilisateur = Column(String(255), unique=True, index=True)
    mot_de_passe = Column(String(1024))
    email = Column(String(255), unique=True, index=True)
