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

// Fonction pour afficher les détails d'un album
async function displayAlbumDetails(albumId) {
    const container = document.querySelector('.container');

    try {
        // Récupère les détails de l'album
        const album = await fetchData(`albums/${albumId}`);
        // Récupère le nom de l'artiste
        const artist = await fetchData(`artists/${album.artiste_id}`);
        const artistName = artist.nom_artiste || 'Artiste inconnu';

        // Récupérer tous les morceaux de l'artiste
        const artistSongs = await fetchData(`songs/?artiste_id=${album.artiste_id}`);

        // Filtrer les morceaux pour n'afficher que ceux associés à l'album
        const filteredSongs = artistSongs.filter(song => song.album_id === parseInt(albumId));

        // Construction du HTML avec les informations de l'album et de l'artiste
        const albumHTML = `
            <div class="album-details">
                <h3>Titre de l'album : ${album.titre}</h3>
                <p><strong>Date de sortie :</strong> ${album.date_sortie || 'Non disponible'}</p>
                <p><strong>Artiste :</strong> ${artistName}</p>
                <img src="${album.pochette || '../images/default-cover.jpg'}" alt="Pochette de l'album" class="album-cover">
            </div>
        `;

        // Affichage des morceaux de l'album filtrés
        let songsHTML = '';
        if (filteredSongs.length > 0) {
            songsHTML = `<h4>Morceaux de l'album :</h4><ul>`;
            filteredSongs.forEach(song => {
                songsHTML += `<li>${song.titre} - Durée : ${song.duree} min</li>`;
            });
            songsHTML += `</ul>`;
        } else {
            songsHTML = `<p>Aucun morceau trouvé pour cet album.</p>`;
        }

        // Injecte les détails de l'album et les morceaux filtrés dans le conteneur
        container.innerHTML += albumHTML + songsHTML;

    } catch (error) {
        console.error('Erreur lors de l\'affichage des détails de l\'album :', error);
        container.innerHTML = '<p>Erreur lors du chargement des informations de l\'album.</p>';
    }
}

// Initialisation de la page
document.addEventListener('DOMContentLoaded', () => {
    // Récupère l'album_id depuis les paramètres de l'URL
    const params = new URLSearchParams(window.location.search);
    const albumId = params.get("album_id");

    if (!albumId) {
        document.querySelector('.container').innerHTML = '<p>Erreur : aucun ID d\'album fourni dans l\'URL.</p>';
    } else {
        // Affiche les détails de l'album
        displayAlbumDetails(albumId);
    }
});
