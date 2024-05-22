//Vérifier un champs requis passe en vert ou en rouge si rempli ou non

const InputEmail = document.getElementById ("EmailInput");
const InputPassword = document.getElementById ("MdpInput");
const btnConnexion = document.getElementById ("btnconnexion");


InputEmail.addEventListener("keyup", validateForm);
InputPassword.addEventListener("keyup", validateForm);
btnConnexion.addEventListener("click", CheckCredentials);

function CheckCredentials() {
    //Ici on appellera l'API pour vérifier les credenrtials en BDD;
    if (InputEmail.value == "test@mail.com" && InputPassword.value == "Azerty12!") {
        alert ("Mot de passe correcte");

        // Il faudra appeler notre API ici.
        const token ="fezfezfzefzefzef"
        // Placer le token en cookie

        // si la connexion est correcte, window.location.replace me renvoi sur la page choisi en route.
        window.location.replace ("/home");
    } else {
        InputEmail.classList.add ("is-invalid");
        InputPassword.classList.add ("id-invalid");
    }
}

//fonction pour valider le formulaire de connexion
function validateForm(){
    const pwdOk = validatePassword(InputPassword);
    const mailOk = validateMail(InputEmail);

    // méthode IF pour que le bouton connexion soit disabled tant que les différents champs ne sont pas OK.
        if(pwdOk && mailOk){
            btnConnexion.disabled = false;
        } else {
            btnConnexion.disabled = true;
        }
}

//Fonction pour vérifier via un Regex la configurtion d'un mail.
function validateMail(input){
    //définir mon Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;

    }
    else{ 
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;

    }
}
// fonction pour définir mon mot de passe 
function validatePassword(input){
    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// fonction pour déterminer si un champs à au moins 1 caractére
function validateRequire (input){
        if (input.value != ''){
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            return true;
    }
        else{ 
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            return false;
    }
}

