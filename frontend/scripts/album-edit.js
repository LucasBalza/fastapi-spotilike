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

// Gérer le formulaire d'édition d'album
document.getElementById("albumForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const titre = document.getElementById("titre").value;
    const pochette = document.getElementById("pochette").value;
    const dateSortie = document.getElementById("date_sortie").value;

    // Préparer les données à envoyer
    const albumData = {
        titre: titre,
        pochette: pochette,
        date_sortie: dateSortie,
    };

    try {
        // Faire une requête PUT pour modifier l'album
        const response = await fetch(`http://127.0.0.1:8000/api/albums/${albumId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(albumData),
        });

        // Vérifier la réponse
        if (response.ok) {
            const result = await response.json();
            alert("Album modifié avec succès !");
            console.log(result); // Affiche l'album modifié dans la console
        } else {
            const errorData = await response.json();
            alert(`Une erreur est survenue : ${errorData.detail}`);
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});
