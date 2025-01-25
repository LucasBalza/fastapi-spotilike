from pydantic import BaseModel

class GenreUpdate(BaseModel):
    titre: str
    description:str
    
    class Config:
        orm_mode = True