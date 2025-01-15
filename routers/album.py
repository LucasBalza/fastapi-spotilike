from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.album import Album
from schemas.album import AlbumCreate, AlbumUpdate
from models.morceau import Morceau
from schemas.morceau import MorceauCreate
from models.utilisateur import Utilisateur
from database import get_db
from auth.utils import get_current_user

router = APIRouter()

@router.get("/api/albums")
def get_albums(db: Session = Depends(get_db)):
    try:
        albums = db.query(Album).all()  # Récupère tous les albums
        return albums
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des albums: {str(e)}")
    
@router.get("/api/albums/{album_id}")
def get_album(album_id: int, db: Session = Depends(get_db)):
    try:
        album = db.query(Album).filter(Album.id == album_id).first()  # Récupère l'album par ID
        if album is None:
            raise HTTPException(status_code=404, detail="Album non trouvé")
        return album
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération de l'album: {str(e)}")
    
@router.get("/api/albums/{album_id}/songs")
def get_album_songs(album_id: int, db: Session = Depends(get_db)):
    try:
        # Récupère l'album par ID
        album = db.query(Album).filter(Album.id == album_id).first()
        if album is None:
            raise HTTPException(status_code=404, detail="Album non trouvé")
        
        # Récupère les morceaux associés
        songs = db.query(Morceau).filter(Morceau.album_id == album_id).all()
        return {"album": album.titre, "album_date":album.date_sortie,"album_pochette":album.pochette, "songs": songs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des morceaux: {str(e)}")

@router.post("/api/albums", response_model=AlbumCreate)
def create_album(album: AlbumCreate, db: Session = Depends(get_db)):
    # Créer un nouvel album avec les données reçues
    new_album = Album(
        titre=album.titre,
        pochette=album.pochette,
        date_sortie=album.date_sortie,
        artiste_id=album.artiste_id
    )
    db.add(new_album)
    db.commit()
    db.refresh(new_album)  # Récupère l'album avec son id généré
    return new_album

@router.post("/api/albums/{album_id}/songs", response_model=MorceauCreate)
def add_song_to_album(album_id: int, morceau: MorceauCreate, db: Session = Depends(get_db)):
    # Récupère l'album à partir de l'ID
    album = db.query(Album).filter(Album.id == album_id).first()
    
    if not album:
        raise HTTPException(status_code=404, detail="Album not found")
    
    # Créer le morceau avec l'ID de l'artiste
    new_song = Morceau(
        titre=morceau.titre,
        duree=morceau.duree,
        album_id=album.id,  # Associe le morceau à l'album
        artiste_id=morceau.artiste_id  # Associe également le morceau à l'artiste
    )
    
    db.add(new_song)
    db.commit()
    db.refresh(new_song)  # Récupère le morceau ajouté avec son id généré
    
    return new_song

@router.delete("/api/albums/{album_id}")
def delete_album(album_id: int, db: Session = Depends(get_db), current_user: Utilisateur = Depends(get_current_user)):
    try:
        # Vérification si l'utilisateur est authentifié (via current_user)
        if not current_user:
            raise HTTPException(status_code=401, detail="Utilisateur non authentifié")

        # Récupérer l'album par ID
        album = db.query(Album).filter(Album.id == album_id).first()

        if album is None:
            raise HTTPException(status_code=404, detail="Album non trouvé")

        # Supprimer les morceaux associés à l'album
        morceaux = db.query(Morceau).filter(Morceau.album_id == album_id).all()
        for morceau in morceaux:
            db.delete(morceau)  # Supprimer chaque morceau

        # Supprimer l'album
        db.delete(album)
        db.commit()

        return {"message": "Album et morceaux supprimés avec succès"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la suppression de l'album: {str(e)}")

@router.put("/api/albums/{id}")
def update_album(id: int, album: AlbumUpdate, db: Session = Depends(get_db)):
    # Vérifier si l'album existe
    existing_album = db.query(Album).filter(Album.id == id).first()
    if not existing_album:
        raise HTTPException(status_code=404, detail="Album non trouvé")
    
    # Mettre à jour les informations de l'album
    existing_album.titre = album.titre
    existing_album.pochette = album.pochette
    existing_album.date_sortie = album.date_sortie 
    
    db.commit()  # Enregistrer les modifications
    db.refresh(existing_album)  # Rafraîchir l'objet pour obtenir les dernières données
    
    return existing_album
