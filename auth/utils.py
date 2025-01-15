from fastapi import Request, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
from models.utilisateur import Utilisateur 
import logging

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # URL pour récupérer le token

# Gestion du mot de passe
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """
    Hache le mot de passe fourni en utilisant bcrypt.
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Vérifie si le mot de passe fourni correspond à celui haché.
    """
    return pwd_context.verify(plain_password, hashed_password)

# Configuration JWT
SECRET_KEY = "patatipatata" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # Durée d'expiration du token en minutes

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    
    user_id = data.get("sub")
    print(f"User id (create_access_token) : {user_id}")
    if not user_id:
        raise ValueError("L'ID utilisateur doit être inclus dans les données pour créer un token valide.")
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    
    # Générer le token JWT avec la clé secrète et l'algorithme
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # Retourne les données encodées dans le token
    except JWTError:
        raise Exception("Token invalide ou expiré")

# Fonction pour obtenir l'utilisateur courant à partir du token
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Utilisateur:
    print(f"Token reçu : {token}")  # Afficher le token reçu
    try:
        # Décoder le token
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        except Exception as e:
            print(f"Erreur lors du décodage du token : {e}")
            raise HTTPException(status_code=401, detail="Erreur lors du décodage du token")

        # Vérification de l'ID utilisateur
        user_id = payload.get("sub")
        print(f"User Id (get_current_user): {user_id}")  # Affiche l'ID de l'utilisateur pour vérifier
        
        if user_id is None:
            raise HTTPException(status_code=401, detail="Jeton invalide")
        
        # Récupérer l'utilisateur depuis la base de données
        user = db.query(Utilisateur).filter(Utilisateur.id == user_id).first()
        if user is None:
            raise HTTPException(status_code=401, detail="Utilisateur non trouvé")
        
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Le jeton a expiré")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Jeton invalide")