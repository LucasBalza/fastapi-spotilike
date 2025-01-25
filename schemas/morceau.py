from pydantic import BaseModel
from typing import List

class MorceauCreate(BaseModel):
    titre: str
    duree: float
    artiste_id: int
    genre_ids: List[int]
    
    class Config:
        orm_mode = True
        
class MorceauResponse(BaseModel):
    id: int
    titre: str
    duree: float
    artiste_id: int
    genre_ids: List[int]
    
    class Config:
        orm_mode = True


class AlbumWithSongs(BaseModel):
    id: int
    titre: str
    morceaux: List[MorceauResponse]
    
    class Config:
        orm_mode = True