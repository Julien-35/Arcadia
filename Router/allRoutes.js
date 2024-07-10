import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/home", "Accueil", "/pages/home.html",[],"js/home.js"),
    new Route("/habitats", "Les habitats", "/pages/habitats/habitats.html",[],"js/habitats.js"),
    new Route("/savane", "La savane", "/pages/habitats/savane.html", [],"js/savane.js"),
    new Route("/marais", "Les marais", "/pages/habitats/marais.html", []),
    new Route("/jungle", "La jungle", "/pages/habitats/jungle.html", []),
    new Route("/services", "Nos services", "/pages/services.html", [], "js/services.js" ),
    new Route("/contact", "Contact", "/pages/contact.html", [],"js/contact.js"),
    new Route("/signin", "Connexion", "/pages/signin.html", ["disconnected"],"js/auth//signin.js" ),
    new Route("/signup", "Inscription", "/pages/connecte/signup.html",[],"js//auth/signup.js"),
    new Route("/admin", "Administrateur", "/pages/connecte/admin.html", [], "/js/admin.js"),
    new Route("/employe", "Employe", "/pages/connecte/employe.html",[],"js/employe.js"),
    new Route("/veterinaire", "Veterinaire", "/pages/connecte/veterinaire.html",[],"js/veterinaire.js"),

    new Route("/test", "test", "/pages/test.html",[],"js/test.js"),

];
    

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Zoo Arcadia";