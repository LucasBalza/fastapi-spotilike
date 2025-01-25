const apiUrl = 'http://127.0.0.1:8000/api';

// Récupérer l'ID de l'album depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get('album_id');
const artistId = urlParams.get('artiste_id');

// Assurer que l'ID d'album est présent
if (!albumId) {
    alert("ID d'album manquant !");
    window.location.href = "albums.html";
}

if (!artistId) {
    alert("ID d'artiste manquant!");
    window.location.href = "albums.html"; 
}

// Charger les genres dans la liste déroulante
async function loadGenres() {
    const genresEndpoint = `${apiUrl}/genres/`;

    try {
        const response = await fetch(genresEndpoint);
        if (response.ok) {
            const genres = await response.json();

            // Remplir la liste déroulante
            const genreSelect = document.getElementById("genre");
            genres.forEach(genre => {
                const option = document.createElement("option");
                option.value = genre.id; // ID du genre
                option.textContent = genre.titre; // Utiliser "titre" comme texte affiché
                genreSelect.appendChild(option);
            });
        } else {
            console.error("Erreur lors de la récupération des genres :", response.status);
            alert("Impossible de charger les genres.");
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
        alert("Une erreur est survenue lors du chargement des genres.");
    }
}

// Charger les genres au chargement de la page
document.addEventListener("DOMContentLoaded", loadGenres);

// Gérer le formulaire d'ajout de morceau
document.getElementById("songForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const titre = document.getElementById("titre").value;
    const duree = document.getElementById("duree").value;
    const genreId = document.getElementById("genre").value;

    if (!genreId) {
        alert("Veuillez sélectionner un genre.");
        return;
    }

    // Préparer les données à envoyer
    const songData = {
        titre: titre,
        duree: duree,
        genre_ids: [parseInt(genreId)],
        artiste_id: artistId, // Associer le morceau à l'artiste
    };

    console.log("Données envoyées :", songData);

    try {
        // Faire une requête POST pour ajouter un morceau à l'album
        const response = await fetch(`${apiUrl}/albums/${albumId}/songs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(songData),
        });

        // Vérifier la réponse
        if (response.ok) {
            const result = await response.json();
            alert("Morceau ajouté avec succès !");
            console.log(result); // Affiche le morceau créé dans la console
        } else {
            alert("Une erreur est survenue lors de l'ajout du morceau.");
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});
