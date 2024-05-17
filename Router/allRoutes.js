import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/home", "Accueil", "/pages/home.html"),
    new Route("/habitats", "Les habitats", "/pages/habitats/habitats.html"),
    new Route("/savane", "La savane", "/pages/habitats/savane.html"),
    new Route("/marais", "Les marais", "/pages/habitats/marais.html"),
    new Route("/jungle", "La jungle", "/pages/habitats/jungle.html"),
    new Route("/services", "Nos services", "/pages/services.html"),
    new Route("/contact", "Contact", "/pages/contact.html"),
];
    

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Zoo Arcadia";