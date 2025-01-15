from pydantic import BaseModel

class GenreUpdate(BaseModel):
    titre: str
    description:str