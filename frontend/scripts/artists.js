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

// Fonction pour afficher la liste des artistes dans un tableau
function displayArtists(artists) {
    const artistsList = document.getElementById('artists-list');
    artistsList.innerHTML = ''; // Réinitialiser la liste
    artists.forEach(artist => {
        const tr = document.createElement('tr');

        // Créer les cellules pour chaque artiste
        const nameCell = document.createElement('td');
        nameCell.textContent = artist.nom_artiste;
        tr.appendChild(nameCell);

        const actionsCell = document.createElement('td');

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Modifier';
        updateButton.onclick = () => window.location.href = `artist-edit.html?artiste_id=${artist.id}`;
        actionsCell.appendChild(updateButton);

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Voir les morceaux';
        detailsButton.onclick = () => window.location.href = `artist-songs.html?artiste_id=${artist.id}`;
        actionsCell.appendChild(detailsButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.onclick = () => deleteArtist(artist.id);
        actionsCell.appendChild(deleteButton);

        tr.appendChild(actionsCell);

        // Ajouter la ligne à la table
        artistsList.appendChild(tr);
    });
}

async function updateArtist(artistId, updatedData) {
    const token = localStorage.getItem('access_token');
    if (!token) {
        alert("Vous devez être connecté pour modifier l'artiste.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/artists/${artistId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (response.ok) {
            alert('Artiste mis à jour avec succès');
            // Rafraîchir les données
            fetchData('artists', displayArtists);
        } else {
            alert('Erreur lors de la mise à jour de l\'artiste');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'artiste:', error);
    }
}

// Fonction pour supprimer un artiste
async function deleteArtist(artistId) {
    try {
        const token = localStorage.getItem('access_token');
        console.log("Token JWT :", token); 

        if (!token) {
            alert("Vous devez être connecté pour effectuer cette action.");
            return;
        }

        const response = await fetch(`${apiUrl}/artist/${artistId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Envoi du token pour l'authentification
            },
        });

        if (response.ok) {
            alert('Artiste supprimé avec succès');
            fetchData('artists', displayArtists);  // Rafraîchir la liste des artistes après suppression
        } else if (response.status === 401) {
            alert("Non autorisé : votre session a peut-être expiré.");
        } else if (response.status === 403) {
            alert("Accès refusé : vous n'êtes pas autorisé à supprimer cet artiste.");
        } else {
            alert('Erreur lors de la suppression de l\'artiste');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'artiste:', error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
}

// Charger les artistes au démarrage de la page
document.addEventListener('DOMContentLoaded', () => {
    fetchData('artists', displayArtists);
});
