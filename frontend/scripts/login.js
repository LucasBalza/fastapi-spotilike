const apiUrl = 'http://127.0.0.1:8000/api';

const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// Fonction pour réinitialiser les messages
function resetMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

// Écouteur d'événement sur le formulaire
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Réinitialiser les messages
    resetMessages();

    // Validation basique des champs
    if (!username || !password) {
        errorMessage.style.display = 'block';
        errorMessage.innerText = "Veuillez remplir tous les champs.";
        return;
    }

    try {
        // Envoi de la requête à l'API pour la connexion
        const response = await fetch(`${apiUrl}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nom_utilisateur: username,
                mot_de_passe: password,
            }),
        });

        if (response.ok) {
            // Connexion réussie, récupération du token
            const data = await response.json();

            if (data.access_token) {
                // Stocker le token dans le Local Storage
                localStorage.setItem('access_token', data.access_token);

                // Affichage du message de succès et du token JWT
                successMessage.style.display = 'block';
                successMessage.innerText = "Connexion réussie !";

            } else {
                throw new Error("Le token JWT est manquant dans la réponse.");
            }
        } else {
            // Connexion échouée, affichage de l'erreur
            const errorData = await response.json();
            errorMessage.style.display = 'block';
            errorMessage.innerText = "Erreur de connexion : " + (errorData.detail || "Nom d'utilisateur ou mot de passe incorrect.");
        }
    } catch (error) {
        // Gestion des erreurs réseau ou autres exceptions
        errorMessage.style.display = 'block';
        errorMessage.innerText = "Erreur de connexion : Impossible de contacter le serveur.";
        console.error("Erreur réseau ou autre :", error);
    }
});
