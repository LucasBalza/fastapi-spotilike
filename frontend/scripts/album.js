const apiUrl = 'http://127.0.0.1:8000/api';

// Fonction générique pour récupérer des données d'une URL
async function fetchData(endpoint, callback) {
    try {
        const response = await fetch(`${apiUrl}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error(`Erreur lors de la récupération des données (${endpoint}):`, error);
    }
}

// Fonction pour récupérer le nom de l'artiste en utilisant l'artiste_id
async function getArtistName(artisteId) {
    const response = await fetch(`${apiUrl}/artists/${artisteId}`);
    const data = await response.json();
    return data.nom_artiste || 'Artiste inconnu'; // Retourner le nom de l'artiste ou un message d'erreur
}

// Fonction pour afficher la liste des albums dans un tableau
async function displayAlbums(albums) {
    const albumsList = document.getElementById('albums-list');
    albumsList.innerHTML = ''; // Réinitialiser la liste
    albums.forEach(async album => {
        const tr = document.createElement('tr');

        // Créer les cellules pour chaque album
        const titreCell = document.createElement('td');
        titreCell.textContent = album.titre;
        tr.appendChild(titreCell);

        const artisteName = await getArtistName(album.artiste_id);

        const artisteCell = document.createElement('td');
        artisteCell.textContent = artisteName;
        tr.appendChild(artisteCell);

        const dateSortieCell = document.createElement('td');
        dateSortieCell.textContent = album.date_sortie || 'Non précisé';
        tr.appendChild(dateSortieCell);

        // Créer une cellule pour les actions (ajout de morceau et suppression)
        const actionsCell = document.createElement('td');
        const addButton = document.createElement('button');
        addButton.textContent = 'Ajouter un morceau';
        addButton.onclick = () => window.location.href = `song-add.html?album_id=${album.id}&artiste_id=${album.artiste_id}`;
        actionsCell.appendChild(addButton);

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Modifier';
        updateButton.onclick = () => window.location.href = `album-edit.html?album_id=${album.id}&artiste_id=${album.artiste_id}`;
        actionsCell.appendChild(updateButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.onclick = () => deleteAlbum(album.id);
        actionsCell.appendChild(deleteButton);

        tr.appendChild(actionsCell);

        // Ajouter la ligne à la table
        albumsList.appendChild(tr);
    });
}

// Fonction pour supprimer un album
async function deleteAlbum(albumId) {
    try {
        const token = localStorage.getItem('access_token');
        console.log("Token JWT :", token); 

        if (!token) {
            alert("Vous devez être connecté pour effectuer cette action.");
            return;
        }

        const response = await fetch(`${apiUrl}/albums/${albumId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            alert('Album supprimé avec succès');
            fetchData('albums', displayAlbums);
        } else if (response.status === 401) {
            alert("Non autorisé : votre session a peut-être expiré.");
        } else if (response.status === 403) {
            alert("Accès refusé : vous n'êtes pas autorisé à supprimer cet album.");
        } else {
            alert('Erreur lors de la suppression de l\'album');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'album:', error);
    }
}

async function updateAlbum(albumId, updatedData) {
    const token = localStorage.getItem('access_token');
    if (!token) {
        alert("Vous devez être connecté pour modifier l'album.");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/albums/${albumId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (response.ok) {
            alert('Album mis à jour avec succès');
            // Rafraîchir les données
            fetchData('albums', displayAlbums);
        } else {
            alert('Erreur lors de la mise à jour de l\'album');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'album:', error);
    }
}


// Charger les albums au démarrage de la page
document.addEventListener('DOMContentLoaded', () => {
    fetchData('albums', displayAlbums);
});
