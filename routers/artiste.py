from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.album import Album
from models.artiste import Artiste
from models.morceau import Morceau
from database import get_db
from models.utilisateur import Utilisateur
from schemas.artiste import ArtistUpdate
from auth.utils import get_current_user

router = APIRouter()

@router.get("/api/artists/")
def get_artistes(db: Session = Depends(get_db)):
    try:
        artistes = db.query(Artiste).all()  # Récupère tous les artistes
        return artistes
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des artistes: {str(e)}")
    
@router.get("/api/artists/{artist_id}")
def get_artist(artist_id: int, db: Session = Depends(get_db)):
    try:
        # Récupère l'artiste par ID
        artist = db.query(Artiste).filter(Artiste.id == artist_id).first()
        if artist is None:
            raise HTTPException(status_code=404, detail="Artiste non trouvé")
        return artist
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération de l'artiste: {str(e)}")
    
@router.get("/api/artists/{artist_id}/songs")
def get_artist_songs(artist_id: int, db: Session = Depends(get_db)):
    try:
        # Récupérer l'artiste avec l'ID spécifié
        artist = db.query(Artiste).filter(Artiste.id == artist_id).first()
        if artist is None:
            raise HTTPException(status_code=404, detail="Artiste non trouvé")
        
        # Récupérer les morceaux associés à cet artiste
        songs = db.query(Morceau).filter(Morceau.artiste_id == artist_id).all()
        
        # Retourner les morceaux (vide si aucun morceau n'est associé)
        return {"artist": artist.nom_artiste, "songs": songs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des morceaux: {str(e)}")


@router.put("/api/artists/{id}")
def update_artist(id: int, artist: ArtistUpdate, db: Session = Depends(get_db)):
    # Vérifier si l'artiste existe
    existing_artist = db.query(Artiste).filter(Artiste.id == id).first()
    if not existing_artist:
        raise HTTPException(status_code=404, detail="Artiste non trouvé")
    
    # Mettre à jour les informations de l'artiste
    existing_artist.nom_artiste = artist.nom_artiste
    existing_artist.avatar = artist.avatar
    existing_artist.biographie = artist.biographie
        
    db.commit()  # Enregistrer les modifications
    db.refresh(existing_artist)  # Rafraîchir l'objet pour obtenir les dernières données
    
    return existing_artist

@router.delete("/api/artist/{artist_id}")
def delete_artist(artist_id: int, db: Session = Depends(get_db), current_user: Utilisateur = Depends(get_current_user)):
    try:
        # Vérification si l'utilisateur est authentifié
        if not current_user:
            raise HTTPException(status_code=401, detail="Utilisateur non authentifié")

        # Récupérer l'artiste par ID
        artist = db.query(Artiste).filter(Artiste.id == artist_id).first()

        if artist is None:
            raise HTTPException(status_code=404, detail="Artiste non trouvé")

        # Supprimer les albums associés à l'artiste
        albums = db.query(Album).filter(Album.artiste_id == artist_id).all()
        
        # Supprimer les morceaux associés à chaque album et ensuite les albums eux-mêmes
        for album in albums:
            # Supprimer directement les morceaux associés à cet album
            db.query(Morceau).filter(Morceau.album_id == album.id).delete(synchronize_session=False)
            db.delete(album)  # Supprimer l'album

        # Supprimer l'artiste
        db.delete(artist)
        db.commit()

        return {"message": "Artiste et ses albums/morceaux supprimés avec succès"}

    except Exception as e:
        # Gestion améliorée des erreurs avec détail
        raise HTTPException(status_code=500, detail=f"Erreur lors de la suppression de l'artiste: {str(e)}")

