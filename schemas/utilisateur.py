from pydantic import BaseModel, EmailStr

class UtilisateurCreate(BaseModel):
    nom_utilisateur: str
    mot_de_passe: str
    email: EmailStr 

    class Config:
        from_attributes = True

class UtilisateurOut(BaseModel):
    id: int
    nom_utilisateur: str
    email: EmailStr

    class Config:
        from_attributes = True
        
class UtilisateurLogin(BaseModel):
    nom_utilisateur: str
    mot_de_passe: str