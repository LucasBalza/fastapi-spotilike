from pydantic import BaseModel
from typing import List

class MorceauCreate(BaseModel):
    titre: str
    duree: int
    artiste_id: int


class AlbumWithSongs(BaseModel):
    id: int
    titre: str
    morceaux: List[MorceauCreate]
    
    class Config:
        from_attributes = True