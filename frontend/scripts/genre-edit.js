const apiUrl = 'http://127.0.0.1:8000/api';

// Récupérer l'ID du genre depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const genreId = urlParams.get('genre_id');

// Assurer que l'ID du genre est présent
if (!genreId) {
    alert("ID du genre manquant !");
    window.location.href = "genres.html"; // Redirige vers la liste des genres si l'ID est manquant
}

// Gérer le formulaire d'édition du genre
document.getElementById("editGenreForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const titreGenre = document.getElementById("genreTitle").value;
    const descriptionGenre = document.getElementById("genreDescription").value;

    // Préparer les données à envoyer
    const genreData = {
        titre: titreGenre,
        description: descriptionGenre,
    };

    try {
        // Faire une requête PUT pour modifier le genre
        const response = await fetch(`http://127.0.0.1:8000/api/genres/${genreId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(genreData),
        });

        // Vérifier la réponse
        if (response.ok) {
            const result = await response.json();
            alert("Genre modifié avec succès !");
            console.log(result); // Affiche les détails du genre modifié dans la console
            window.location.href = "genres.html"; // Redirige vers la page des genres
        } else {
            const errorData = await response.json();
            alert(`Une erreur est survenue : ${errorData.detail}`);
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

// Charger les données existantes du genre
async function fetchGenreDetails() {
    try {
        const response = await fetch(`${apiUrl}/genre/${genreId}`);
        if (response.ok) {
            const genre = await response.json();
            document.getElementById("genreTitle").value = genre.titre;
            document.getElementById("genreDescription").value = genre.description;
        } else {
            alert("Impossible de charger les détails du genre.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du genre :", error);
    }
}

// Charger les données du genre à l'ouverture de la page
fetchGenreDetails();
