import Route from "./Route.js";

// Définir vos routes ici
export const allRoutes = [
    new Route("/home", "Accueil", "/pages/home.html", [], "js/home.js"),
    new Route("/habitats", "Les habitats", "/pages/habitats.html", [], "js/habitats.js"),
    new Route("/services", "Nos services", "/pages/services.html", [], "js/services.js"),
    new Route("/contact", "Contact", "/pages/contact.html", [], "js/contact.js"),
    new Route("/signin", "Connexion", "/pages/signin.html", ["disconnected"], "js/auth/signin.js"),
    new Route("/admin", "Administrateur", "/pages/connecte/admin.html", ["ROLE_ADMIN"], "js/admin.js"),
    new Route("/employe", "Employe", "/pages/connecte/employe.html", ["ROLE_EMPLOYE"], "js/employe.js"),
    new Route("/veterinaire", "Veterinaire", "/pages/connecte/veterinaire.html", ["ROLE_VETERINAIRE"], "js/veterinaire.js"),
    new Route("/test", "Test", "/pages/test.html", [], "js/test.js"),
];

export const websiteName = "Zoo Arcadia";