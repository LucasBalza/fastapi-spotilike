from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.album import Album
from models.artiste import Artiste
from models.genre import Genre
from models.morceau import Morceau
from database import get_db
from sqlalchemy.orm import joinedload

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

