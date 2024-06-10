//Vérifier un champs requis passe en vert ou en rouge si rempli ou non

const InputEmail = document.getElementById ("EmailInput");
const InputPassword = document.getElementById ("password");
const btnConnexion = document.getElementById ("btnconnexion");
const SigninForm = document.getElementById ("signinForm");

InputEmail.addEventListener("keyup", validateForm);
InputPassword.addEventListener("keyup", validateForm);
btnConnexion.addEventListener("click", CheckCredentials);



function CheckCredentials() {
    let dataForm = new FormData(SigninForm);
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
        "username": dataForm.get("email"),
        "password": dataForm.get("password")
    });
    let requestOptions = {
        mode:  'no-cors', 
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/api/login", requestOptions)
    .then((response) => response.text())
    .then(result => {
        const token = result.apiToken;
        setToken(token);
        setCookie(roleCookieName, result.roles[0], 7);

        window.location.replace("/admin");
    })
    .catch((error) => console.error(error));
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


/* 
Disconnected
Connected 
-admin
-vétérinaire
-employé)
*/