from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import genre, artiste, album, morceau, utilisateur

app = FastAPI()

# Autoriser les requêtes depuis tous les domaines
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autorise toutes les origines
    allow_credentials=True,
    allow_methods=["*"],  # Autorise toutes les méthodes (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Autorise tous les headers
)

Base.metadata.create_all(bind=engine)

# Inclusion des routers pour les genres et artistes
app.include_router(genre.router)
app.include_router(artiste.router)
app.include_router(album.router)
app.include_router(morceau.router)
app.include_router(utilisateur.router)

# Endpoint racine pour tester
@app.get("/")
def root():
    return {"message": "Bienvenue sur l'API Spotilike !"}