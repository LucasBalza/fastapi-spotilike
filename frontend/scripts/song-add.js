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

// Gérer le formulaire d'ajout de morceau
document.getElementById("songForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const titre = document.getElementById("titre").value;
    const duree = document.getElementById("duree").value;

    // Préparer les données à envoyer
    const songData = {
        titre: titre,
        duree: duree,
        artiste_id: artistId,  // Associer le morceau à l'artiste sélectionné
    };

    try {
        // Faire une requête POST pour ajouter un morceau à l'album
        const response = await fetch(`http://127.0.0.1:8000/api/albums/${albumId}/songs`, {
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