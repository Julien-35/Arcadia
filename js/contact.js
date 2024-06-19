const contact = document.getElementById("contactTitle");
const message = document.getElementById("contactDescription");
const email = document.getElementById("exampleInputEmail1");
const btnSend = document.getElementById("btnSend");

contact.addEventListener("keyup", validateFormContact);
email.addEventListener("keyup", validateFormContact);

btnSend.addEventListener("click", CheckCredentials);

//fonction pour valider le formulaire de d'inscription
function validateFormContact(){
    const contactOk = validateData (contact);
    const messageOk = validateTextArea (message);
    const emailOk = validateMailVisiteur(email);
        if(contactOk && messageOk && emailOk ){
            btnSend.disabled = false;
            } else {
                btnSend.disabled = true;
            }
        }


function validateData(input){
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

function validateTextArea(textarea){
    if (textarea.value != ''){
        textarea.classList.add("is-valid");
        textarea.classList.remove("is-invalid");
        return true;
}
    else{ 
        textarea.classList.remove("is-valid");
        textarea.classList.add("is-invalid");
        return false;
}
}

//Fonction pour vérifier via un Regex la configurtion d'un mail.
function validateMailVisiteur(input){
    //définir mon Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailVisiteur = input.value;
    if (mailVisiteur.match(emailRegex)){
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

// Script pour l'envoi d'un mail


function sendEmail() {
    email.send({
        Host : "smtp.yourisp.com",
        Username : "username",
        Password : "password",
        To : 'julien45.dubois@gmail.com',
        From : "contact@isp.com",
        Subject : "ceci est l'objet",
        Body : "Et ceci est le message"
    }).then(
      message => alert(message)
    );
    }