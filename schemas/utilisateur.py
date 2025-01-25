from pydantic import BaseModel, EmailStr

class UtilisateurCreate(BaseModel):
    nom_utilisateur: str
    mot_de_passe: str
    email: EmailStr 

    class Config:
        orm_mode = True

class UtilisateurOut(BaseModel):
    id: int
    nom_utilisateur: str
    email: EmailStr

    class Config:
        orm_mode = True
        
class UtilisateurLogin(BaseModel):
    nom_utilisateur: str
    mot_de_passe: str
    
    class Config:
        orm_mode = True