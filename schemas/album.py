from pydantic import BaseModel
from datetime import date

# Définition du modèle pour la création d'un album
class AlbumCreate(BaseModel):
    titre: str
    pochette: str
    date_sortie: date
    artiste_id: int

    class Config:
        from_attributes = True

# Définition du modèle pour la modification de l'album
class AlbumUpdate(BaseModel):
    titre: str
    pochette:str
    date_sortie: str