// création d'une varialbe tokenCookie car elle sera appelé plusieurs fois 
const tokenCookieName = "accestoken";
//Création de ma variable pour la partie deconnexion depuis l'ID de mon index.html.
const btnSignout = document.getElementById("btnSignout");
// création de la variable roleCookieName car le nom role est utilisé plusieurs fois.
const roleCookieName = "role"

// création de l'évenement du bouton Deconnexion. Au click - le nom 

btnSignout.addEventListener("click", deconnexion);


  

//création de la fonction qui prend le nom de l'évenement ci-dessus 'deconnexion' permettant de supprimer les cookies
function deconnexion() {
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName);
    window.location.reload();
}

// fonction setToken pour donner le nombre de jour valide du cookie et le nom qu'on lui a donné en variable. 
function setToken (token) {
    // nom varible + argument de ma fonction + nbre de jour
    setCookie (tokenCookieName, token, 7)
}

// Fonction pour obtenir le rôle de l'utilisateur
const getRole = () => {
    // Implémentez la logique pour obtenir le rôle de l'utilisateur
    // Par exemple, récupérer le rôle à partir d'un token ou d'une session
    return sessionStorage.getItem("userRole") || "disconnected";
  };
  
function getToken () {
    return getCookie (tokenCookieName);
}

// Fonction pour définir un cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Fonction pour obtenir la valeur d'un cookie
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let c of ca) {
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// Fonction pour vérifier la connexion de l'utilisateur
const isConnected = () => {
    return getCookie(tokenCookieName) !== null;
};

// permet de tester si mon cookie fonctionne en affichant des alertes 
/*if(isConnected()) {
    alert ("je suis connecté");
} else {
    alert("je ne suis pas connecté");
}*/

// Fonction pour afficher ou masquer les éléments en fonction du rôle
function showAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();

    document.querySelectorAll('[data-show]').forEach(element => {
        const showRole = element.dataset.show;
        let shouldShow = false;

        switch (showRole) {
            case 'disconnected':
                shouldShow = !userConnected;
                break;
            case 'connected':
                shouldShow = userConnected;
                break;
            case 'admin':
                shouldShow = userConnected && role === "ROLE_ADMIN";
                break;
            case 'employe':
                shouldShow = userConnected && role === "ROLE_EMPLOYE";
                break;
            case 'veterinaire':
                shouldShow = userConnected && role === "ROLE_VETERINAIRE";
                break;
        }

        element.classList.toggle("d-none", !shouldShow);
    });
}
// Appeler la fonction pour mettre à jour l'affichage des éléments selon le rôle de l'utilisateur


// Consolidation de l'événement DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    showAndHideElementsForRoles();

  });
  

  async function login(email, password) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        setCookie(tokenCookieName, data.apiToken, 7);
        setCookie(roleCookieName, data.roles[0], 7); // Assume the first role is the main role
        window.location.href = '/'; // Redirect after successful login
    } else {
        alert(data.message);
    }
}