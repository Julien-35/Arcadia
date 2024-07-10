const InputEmail = document.getElementById("EmailInput");
const InputPassword = document.getElementById("PasswordInput");
const btnConnexion = document.getElementById("btnConnexion");
const SigninForm = document.getElementById("formulaireConnexion");

// Ajoutez des écouteurs d'événements pour la validation en temps réel
InputEmail.addEventListener("keyup", validateForm);
InputPassword.addEventListener("keyup", validateForm);

// Ajoutez un écouteur d'événement pour le bouton de connexion
btnConnexion.addEventListener("click", ConnexionUtilisateur);

// Fonction pour valider le formulaire de connexion
function validateForm() {
    const pwdOk = validatePassword(InputPassword);
    const mailOk = validateMail(InputEmail);

    // Active ou désactive le bouton en fonction de la validité des champs
    btnConnexion.disabled = !(pwdOk && mailOk);
}

// Fonction pour vérifier via un Regex la configuration d'un e-mail
function validateMail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (emailRegex.test(mailUser)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour définir la validité du mot de passe
function validatePassword(input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordRegex.test(passwordUser)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour gérer la connexion de l'utilisateur
function ConnexionUtilisateur(event) {
    event.preventDefault();

    let email = InputEmail.value;
    let password = InputPassword.value;

    let loginData = {
        "email": email,
        "password": password
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(loginData);

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        mode: "cors",
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/login", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(result => {
            setToken(result.token); 
            setCookie(roleCookieName, result.role, 7); 
            
            window.location.href = '/employe';
        })
        .catch(error => console.error('Error:', error));
}


// Fonction pour vérifier les champs requis (par exemple, non vides)
function validateRequire(input) {
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
