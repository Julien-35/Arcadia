
// création d'une varialbe tokenCookie car elle sera appelé plusieurs fois 

const tokenCookieName = "accestoken";
//Création de ma variable pour la partie deconnexion depuis l'ID de mon index.html.
const btnSignout = document.getElementById ("btnSignout");
// création de la variable roleCookieName car le nom role est utilisé plusieurs fois.
const roleCookieName = "role"

// création de l'évenement du bouton Deconnexion. Au click - le nom 

btnSignout.addEventListener("click", deconnexion);

//création de la fonction qui prend le nom de l'évenement ci-dessus 'deconnexion' permettant de supprimer les cookies
function deconnexion () {
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName);
    window.location.reload();
}

// fonction setToken pour donner le nombre de jour valide du cookie et le nom qu'on lui a donné en variable. 
function setToken (token) {
    // nom varible + argument de ma fonction + nbre de jour
    setCookie (tokenCookieName, token, 7)
}

// Permet de récupérer le role de la personne connecté
function getRole (){
    return getCookie (roleCookieName);
}


function getToken () {
    return getCookie (tokenCookieName);
}

// Copier - coller du cours. 
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


// fonction pour savoir si on est connecté.
function isConnected(){
    if(getToken() == null || getToken == undefined){
        return false;
    }
    else{
        return true;
    }
}

// permet de tester si mon cookie fonctionne en affichant des alertes 
/*if(isConnected()) {
    alert ("je suis connecté");
} else {
    alert("je ne suis pas connecté");
}*/

// Création d'une fonction pour afficher ou non le bouton connexion et ou deconnexion 
function showAndHideElementsForRoles(){
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element =>{
        switch(element.dataset.show){
            case 'disconnected': 
                if(userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'connected': 
                if(!userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'admin': 
                if(!userConnected || role != "admin"){
                    element.classList.add("d-none");
                }
                break;
            case 'employe': 
                if(!userConnected || role != "employe"){
                    element.classList.add("d-none");
                }
                break
                case 'veterinaire': 
                if(!userConnected || role != "veterinaire"){
                    element.classList.add("d-none");
                }
                break;

                
        }
    })
}


let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})