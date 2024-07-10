(function() {
    emailjs.init("hiebLS3jQ2Yh7c-d-"); // Remplacez par votre ID utilisateur EmailJS
})();

const InputPrenom = document.getElementById("PrenomInput");
const InputNom = document.getElementById("NomInput");
const InputEmail = document.getElementById("EmailInput");
const InputPassword = document.getElementById("PasswordInput");
const btnInscription = document.getElementById("btnInscription");
const FormInscription = document.getElementById("formulaireInscription");

InputPrenom.addEventListener("keyup", validateForm);
InputNom.addEventListener("keyup", validateForm);
InputEmail.addEventListener("keyup", validateForm);
InputPassword.addEventListener("keyup", validateForm);
btnInscription.addEventListener("click", InscrireUtilisateur);

// Fonction pour valider le formulaire d'inscription
function validateForm() {
    const PrenomOk = validatePrenom(InputPrenom);
    const NomOk = validateNom(InputNom);
    const pwdOk = validatePassword(InputPassword);
    const mailOk = validateMail(InputEmail);

    // Méthode IF pour que le bouton inscription soit disabled tant que les différents champs ne sont pas OK.
    btnInscription.disabled = !(PrenomOk && NomOk && pwdOk && mailOk);
}

// Fonction pour vérifier via un Regex la configuration d'un mail
function validateMail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour définir mon mot de passe
function validatePassword(input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour déterminer si un champ a au moins 1 caractère
function validatePrenom(input) {
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour déterminer si un champ a au moins 1 caractère
function validateNom(input) {
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function InscrireUtilisateur(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

    let dataForm = new FormData(FormInscription);
    let userData = {
        "prenom": dataForm.get("prenom"),
        "nom": dataForm.get("nom"),
        "email": dataForm.get("email"),
        "password": dataForm.get("password")
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(userData);

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/registration", requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorText => {
                    throw new Error(`Erreur ${response.status}: ${errorText}`);
                });
            }
            return response.json();
        })
        .then(result => {
            console.log("Inscription réussie:", result);

            // Envoyer l'email via EmailJS après l'inscription réussie
            let templateParams = {
                from_name: `${userData.prenom} ${userData.nom}`,
                to_email: userData.email,
                message: `Bienvenue ${userData.prenom} ${userData.nom}! Votre inscription a été réussie.`
            };

            emailjs.send('service_veuyjvv', 'templateId', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Inscription réussie et e-mail envoyé!');
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Inscription réussie mais échec de l\'envoi du message.');
                });
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'inscription. Veuillez vérifier les données.');
        });
}
