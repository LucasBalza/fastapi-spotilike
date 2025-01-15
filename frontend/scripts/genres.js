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

// Fonction pour afficher la liste des genres dans un tableau
function displayGenres(genres) {
    const genresList = document.getElementById('genres-list');
    genresList.innerHTML = ''; // Réinitialiser la liste
    genres.forEach(genre => {
        const tr = document.createElement('tr');

        // Créer les cellules pour chaque genre
        const nameCell = document.createElement('td');
        nameCell.textContent = genre.titre;
        tr.appendChild(nameCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = genre.description;
        tr.appendChild(descriptionCell);

        const actionCell = document.createElement('td');
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Modifier';
        updateButton.onclick = () => window.location.href = `genre-edit.html?genre_id=${genre.id}`;
        actionCell.appendChild(updateButton);

        tr.appendChild(actionCell);

        // Ajouter la ligne à la table
        genresList.appendChild(tr);
    });
}

// Fonction pour afficher les morceaux d'un genre
async function showGenreSongs(genreId) {
    try {
        const response = await fetch(`${apiUrl}/genres/${genreId}/songs`);
        const data = await response.json();

        // Extraire les morceaux et le genre de la réponse
        const songs = data.songs;
        const genreName = data.genre;

        const songsList = document.getElementById('genre-songs-list');
        songsList.innerHTML = '';

        // Vérifier si des morceaux ont été trouvés
        if (songs.length > 0) {
            // Afficher le nom du genre
            const genreHeader = document.getElementById('genre-name');
            genreHeader.textContent = `Morceaux du genre : ${genreName}`;

            // Afficher les morceaux
            songs.forEach(song => {
                const li = document.createElement('li');
                li.textContent = `${song.titre} (Durée: ${song.duree} min)`;
                songsList.appendChild(li);
            });
        } else {
            songsList.innerHTML = '<li>Aucun morceau trouvé pour ce genre</li>';
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des morceaux du genre:', error);
    }
}

// Charger les genres au démarrage de la page
document.addEventListener('DOMContentLoaded', () => {
    fetchData('genres', displayGenres);
});
