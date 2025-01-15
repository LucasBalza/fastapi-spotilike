const apiUrl = 'http://127.0.0.1:8000/api';

// Fonction générique pour récupérer des données d'une URL
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${apiUrl}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erreur lors de la récupération des données (${endpoint}):`, error);
    }
}

// Fonction pour afficher la liste des morceaux dans un tableau
async function displaySongs(morceaux) {
    const morceauxList = document.getElementById('morceaux-list');
    morceauxList.innerHTML = ''; // Réinitialiser la liste

    for (const morceau of morceaux) {
        // Récupérer l'artiste et l'album via leurs IDs
        const artistPromise = fetchData(`artists/${morceau.artiste_id}`);
        const albumPromise = fetchData(`albums/${morceau.album_id}`);

        // Attendre la résolution des deux promesses
        const [artist, album] = await Promise.all([artistPromise, albumPromise]);

        const tr = document.createElement('tr');

        // Créer les cellules pour chaque morceau
        const nameCell = document.createElement('td');
        nameCell.textContent = morceau.titre;
        tr.appendChild(nameCell);

        const artistCell = document.createElement('td');
        artistCell.textContent = artist.nom_artiste || 'Artiste inconnu';
        tr.appendChild(artistCell);

        const albumCell = document.createElement('td');
        albumCell.textContent = album.titre || 'Album inconnu';
        tr.appendChild(albumCell);

        const durationCell = document.createElement('td');
        durationCell.textContent = morceau.duree || 'Non spécifiée';
        tr.appendChild(durationCell);

        // tr.appendChild(actionsCell);

        // Ajouter la ligne à la table
        morceauxList.appendChild(tr);
    }
}

// Charger les morceaux au démarrage de la page
document.addEventListener('DOMContentLoaded', () => {
    fetchData('songs').then(displaySongs);
});
