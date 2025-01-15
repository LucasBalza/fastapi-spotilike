document.getElementById("albumForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const titre = document.getElementById("titre").value;
    const pochette = document.getElementById("pochette").value;
    const date_sortie = document.getElementById("date_sortie").value;
    const artiste_id = document.getElementById("artiste_id").value;

    // Préparer les données à envoyer au backend
    const albumData = {
        titre: titre,
        pochette: pochette,
        date_sortie: date_sortie,
        artiste_id: artiste_id
    };

    try {
        // Faire une requête POST pour ajouter l'album
        const response = await fetch('http://127.0.0.1:8000/api/albums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(albumData),
        });

        // Vérifier la réponse
        if (response.ok) {
            const result = await response.json();
            alert("Album ajouté avec succès !");
            console.log(result); // Affiche l'album créé dans la console
        } else {
            alert("Une erreur est survenue lors de l'ajout de l'album.");
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});