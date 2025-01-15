from pydantic import BaseModel

# Définition du modèle pour la modification de l'artiste
class ArtistUpdate(BaseModel):
    nom_artiste: str
    avatar: str
    biographie:str