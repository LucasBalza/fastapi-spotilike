from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.genre import Genre
from database import get_db
from schemas.genre import GenreUpdate

router = APIRouter()

@router.get("/api/genres/")
def get_genres(db: Session = Depends(get_db)):
    try:
        genres = db.query(Genre).all()  # Tente de récupérer les genres de la base de données
        return genres
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des genres: {str(e)}")

@router.get("/api/genre/{genre_id}")
def get_artist(genre_id: int, db: Session = Depends(get_db)):
    try:
        # Récupère l'artiste par ID
        artist = db.query(Genre).filter(Genre.id == genre_id).first()
        if artist is None:
            raise HTTPException(status_code=404, detail="Genre non trouvé")
        return artist
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération du genre: {str(e)}")

@router.put("/api/genres/{id}")
def update_genre(id: int, genre: GenreUpdate, db: Session = Depends(get_db)):
    # Vérifier si le genre existe
    existing_genre = db.query(Genre).filter(Genre.id == id).first()
    if not existing_genre:
        raise HTTPException(status_code=404, detail="Genre non trouvé")
    
    # Mettre à jour les informations du genre
    existing_genre.titre = genre.titre
    existing_genre.description = genre.description
    
    db.commit() 
    db.refresh(existing_genre)
    
    return existing_genre