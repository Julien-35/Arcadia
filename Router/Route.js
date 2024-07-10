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

