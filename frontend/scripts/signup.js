// Fonction pour gérer la soumission du formulaire
document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault();  // Empêcher le rechargement de la page

    // Récupérer les valeurs des champs
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        nom_utilisateur: username,
        email: email,
        mot_de_passe: password
    };

    try {
        // Envoi de la requête POST à l'API FastAPI
        const response = await fetch('http://localhost:8000/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Inscription réussie !');
            // Rediriger ou vider le formulaire si nécessaire
            // window.location.href = '/login';  // Exemple pour rediriger vers la page de connexion
        } else {
            // Afficher l'erreur s'il y en a une
            document.getElementById('error-message').textContent = result.detail || 'Une erreur est survenue.';
        }
    } catch (error) {
        // Gérer les erreurs liées à la requête
        document.getElementById('error-message').textContent = 'Erreur lors de la soumission du formulaire.';
    }
});