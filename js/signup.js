const InputPrenom = document.getElementById ("PrenomInput");
const InputNom = document.getElementById ("NomInput");
const InputEmail = document.getElementById ("EmailInput");
const InputPassword = document.getElementById ("PasswordInput");
const btnInscription = document.getElementById ("btnInscription");
const FormInscription = document.getElementById("formulaireInscription");

InputPrenom.addEventListener("keyup", validateForm);
InputNom.addEventListener("keyup", validateForm);
InputEmail.addEventListener("keyup", validateForm);
InputPassword.addEventListener("keyup", validateForm);
btnInscription.addEventListener("click", InscrireUtilisateur);



//fonction pour valider le formulaire de d'inscription
function validateForm(){
    const PrenomOk = validatePrenom (InputPrenom);
    const NomOk = validateNom (InputNom);
    const pwdOk = validatePassword(InputPassword);
    const mailOk = validateMail(InputEmail);

    // méthode IF pour que le bouton connexion soit disabled tant que les différents champs ne sont pas OK.
        if(PrenomOk && NomOk && pwdOk && mailOk){
            btnInscription.disabled = false;
        } else {
            btnInscription.disabled = true ;
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
function validatePrenom (input){
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

// fonction pour déterminer si un champs à au moins 1 caractére
function validateNom (input){
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

function InscrireUtilisateur () {
    let dataForm = new FormData (FormInscription);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
      "email": dataForm.get ("email"),
      "password": dataForm.get ("password"),
    });
    
    let requestOptions = {
      mode:  'no-cors', 
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
fetch("http://127.0.0.1:8000/api/registration", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}