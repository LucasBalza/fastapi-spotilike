from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.album import Album
from models.artiste import Artiste
from models.genre import Genre
from models.morceau import Morceau
from database import get_db

router = APIRouter()

@router.get("/api/songs/")
def get_morceaux(db: Session = Depends(get_db)):
    try:
        morceaux = db.query(Morceau).all()  # Récupère tous les morceaux
        return morceaux
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des morceaux: {str(e)}")
    
@router.get("/api/songs/{morceau_id}")
def get_morceau(morceau_id: int, db: Session = Depends(get_db)):
    try:
        morceau = db.query(Morceau).filter(Morceau.id == morceau_id).first()  # Récupère le morceau par ID
        if morceau is None:
            raise HTTPException(status_code=404, detail="Morceau non trouvé")
        return morceau
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération du morceau: {str(e)}")

@router.post("/api/songs/")
def create_morceau(
    titre: str,
    duree: float,
    artiste_id: int,
    album_id: int,
    genre_ids: list[int],  # Liste des genres associés
    db: Session = Depends(get_db)
):
    # Vérification si l'artiste existe
    artiste = db.query(Artiste).filter(Artiste.id == artiste_id).first()
    if not artiste:
        raise HTTPException(status_code=404, detail="Artiste non trouvé")

    # Vérification si l'album existe
    album = db.query(Album).filter(Album.id == album_id).first()
    if not album:
        raise HTTPException(status_code=404, detail="Album non trouvé")
    
    db_morceau = Morceau(
        titre=titre,
        duree=duree,
        artiste_id=artiste.id,  # Associer l'artiste par ID
        album_id=album.id       # Associer l'album par ID
    )

    # Ajouter le morceau dans la base de données
    db.add(db_morceau)
    db.commit()
    db.refresh(db_morceau)

    # Ajouter les genres au morceau
    for genre_id in genre_ids:
        genre = db.query(Genre).filter(Genre.id == genre_id).first()
        if genre:
            db_morceau.genres.append(genre)

    db.commit()
    db.refresh(db_morceau)

    return db_morceau

