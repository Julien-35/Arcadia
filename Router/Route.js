// Détermine les différentes route mais également les autorisations 

export default class Route {
    constructor(url, title, pathHtml,authorize, pathJS = "") {
      this.url = url;
      this.title = title;
      this.pathHtml = pathHtml;
      this.pathJS = pathJS;
      // On rajoute la ligne authorize pour ainsi donner des autorisations selons les utilisateurs
      this.authorize = authorize;
    }
}

/* 
[] -> accès quand on est déconnecté 
["disconnected"] -> Réserver au utilisateur déconnecté
["admin"] -> Réserver au utilisateur au role admin
["veterinaire"] -> Réserver au utilisateur au role veterinaire
["employe"] -> Réserver au utilisateur au role employe
["admin", "employe"] -> Réserver au utilisateur au role admin OU employe
["admin", "veterinaire"] -> Réserver au utilisateur au role admin OU veterinaire
["employe", "veterinaire"] -> Réserver au utilisateur au role employe OU veterinaire
*/ 