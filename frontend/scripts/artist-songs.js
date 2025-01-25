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
        throw error;
    }
}

// Fonction pour afficher les morceaux d'un artiste
async function showArtistSongs(artistId) {
    try {
        // Récupérer les morceaux et le nom de l'artiste depuis l'API
        const data = await fetchData(`artists/${artistId}/songs`);
        
        const songs = data.songs || []; // Par défaut, tableau vide si pas de morceaux
        const artistName = data.artist || 'Artiste inconnu';

        const container = document.querySelector('.container');

        // Réinitialiser le contenu
        container.innerHTML = '';

        // Ajouter le titre de l'artiste
        const artistHeader = document.createElement('h2');
        artistHeader.textContent = `Morceaux de l'artiste : ${artistName}`;
        container.appendChild(artistHeader);

        // Ajouter une liste des morceaux
        const songsList = document.createElement('ul');
        songsList.id = 'artist-songs-list';

        // Vérifier s'il y a des morceaux à afficher
        if (songs.length > 0) {
            songs.forEach(song => {
                const li = document.createElement('li');
                li.textContent = `${song.titre} (Durée: ${song.duree} min)`;
                songsList.appendChild(li);
            });
        } else {
            const noSongsMessage = document.createElement('p');
            noSongsMessage.textContent = 'Aucun morceau trouvé pour cet artiste.';
            container.appendChild(noSongsMessage);
        }

        // Ajouter la liste des morceaux à la page
        container.appendChild(songsList);
    } catch (error) {
        console.error('Erreur lors de la récupération des morceaux de l\'artiste:', error);

        // Ajouter un message d'erreur dans la page
        const container = document.querySelector('.container');
        container.innerHTML = '<p>Erreur lors du chargement des morceaux de l\'artiste.</p>';
    }
}

// Initialiser la page et afficher les morceaux pour un artiste donné
document.addEventListener('DOMContentLoaded', async () => {
    // Récupérer l'ID de l'artiste depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const artistId = params.get('artiste_id');

    if (!artistId) {
        const container = document.querySelector('.container');
        container.innerHTML = '<p>Erreur : aucun ID d\'artiste fourni.</p>';
        return;
    }

    // Charger et afficher les morceaux de l'artiste
    await showArtistSongs(artistId);
});
