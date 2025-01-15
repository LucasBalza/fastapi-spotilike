from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models.utilisateur import Utilisateur
from schemas.utilisateur import UtilisateurLogin
from database import get_db
from auth.utils import create_access_token, hash_password, verify_password 
from schemas.utilisateur import UtilisateurCreate, UtilisateurOut 

router = APIRouter()

@router.post("/users/signup", response_model=UtilisateurOut)
async def signup_user(user: UtilisateurCreate, db: Session = Depends(get_db)):
    # Vérifier si un utilisateur avec ce nom ou email existe déjà
    existing_user = db.query(Utilisateur).filter(
        (Utilisateur.nom_utilisateur == user.nom_utilisateur) | 
        (Utilisateur.email == user.email)
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Nom d'utilisateur ou email déjà pris")

    # Créer un nouvel utilisateur
    hashed_password = hash_password(user.mot_de_passe)  # Hachage du mot de passe
    new_user = Utilisateur(
        nom_utilisateur=user.nom_utilisateur,
        mot_de_passe=hashed_password,
        email=user.email
    )

    # Ajouter l'utilisateur à la base de données
    db.add(new_user)
    db.commit()
    db.refresh(new_user)  # Récupérer les données de l'utilisateur nouvellement inséré

    return new_user

@router.post("/api/users/login")
async def login(utilisateur_login: UtilisateurLogin, db: Session = Depends(get_db)):
    # Vérifier si l'utilisateur existe dans la base de données
    utilisateur = db.query(Utilisateur).filter(Utilisateur.nom_utilisateur == utilisateur_login.nom_utilisateur).first()
    
    if utilisateur is None:
        raise HTTPException(status_code=401, detail="Nom d'utilisateur ou mot de passe incorrect")
    
    # Vérifier si le mot de passe est correct
    if not verify_password(utilisateur_login.mot_de_passe, utilisateur.mot_de_passe):
        raise HTTPException(status_code=401, detail="Nom d'utilisateur ou mot de passe incorrect")
    
    # Créer un token JWT pour l'utilisateur avec conversion de l'id en string pour la méthode create_access_token
    access_token = create_access_token(data={"sub": str(utilisateur.id)})
    print(f"ID User (login) :{utilisateur.id}")
    
    return {"access_token": access_token, "token_type": "bearer"}