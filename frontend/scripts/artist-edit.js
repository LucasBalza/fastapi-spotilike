// Récupérer l'ID de l'artiste depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const artistId = urlParams.get('artiste_id');

// Assurer que l'ID de l'artiste est présent
if (!artistId) {
    alert("ID d'artiste manquant !");
    window.location.href = "artists.html";
}

// Gérer le formulaire d'édition d'artiste
document.getElementById("artistForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const nomArtiste = document.getElementById("nom_artiste").value;
    const avatar = document.getElementById("avatar").value;
    const biographie = document.getElementById("biographie").value;

    // Préparer les données à envoyer
    const artistData = {
        nom_artiste: nomArtiste,
        avatar: avatar,
        biographie: biographie,
    };

    try {
        // Faire une requête PUT pour modifier l'artiste
        const response = await fetch(`http://127.0.0.1:8000/api/artists/${artistId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(artistData),
        });

        // Vérifier la réponse
        if (response.ok) {
            const result = await response.json();
            alert("Artiste modifié avec succès !");
            console.log(result); // Affiche l'artiste modifié dans la console
            window.location.href = "artists.html"; // Rediriger vers la page des artistes
        } else {
            const errorData = await response.json();
            alert(`Une erreur est survenue : ${errorData.detail}`);
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

// Charger les données existantes de l'artiste
async function fetchArtistDetails() {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/artists/${artistId}`);
        if (response.ok) {
            const artist = await response.json();
            document.getElementById("nom_artiste").value = artist.nom_artiste;
            document.getElementById("avatar").value = artist.avatar;
            document.getElementById("biographie").value = artist.biographie;
        } else {
            alert("Impossible de charger les détails de l'artiste.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'artiste :", error);
    }
}

// Charger les données de l'artiste à l'ouverture de la page
fetchArtistDetails();
