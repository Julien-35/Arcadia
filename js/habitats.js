let togg1 = document.getElementById("togg1");
let togg2 = document.getElementById("togg2");
let togg3 = document.getElementById ("togg3");
let d1 = document.getElementById("d1");
let d2 = document.getElementById("d2");
let d3 = document.getElementById("d3");
let d4 = document.getElementById("d4");
let d5 = document.getElementById("d5");
let d6 = document.getElementById("d6");


function getToken() {
  return localStorage.getItem('apiToken');
}

async function fetchData(url, headers) {
  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
    mode: "cors",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) throw new Error("Impossible de récupérer les informations");
    return response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}

if (document.readyState === "loading") {
   
  } else {
     voirHabitat();
  }
  if (document.readyState === "loading") {
   
  } else {
      voirAnimal ();
  }


togg1.addEventListener("click", () => {
  if(getComputedStyle(d1,d2).display != "none"){
    d1.style.display = "none";
    d2.style.display = "none";
  } else {
    d1.style.display = "block";
    d2.style.display = "block";
  }
});


function toggSavane(){
  if(getComputedStyle(d1,d2).display != "none"){
    d1.style.display = "none";
    d2.style.display = "none";
  } else {
    d1.style.display = "block";
    d2.style.display = "none";
  }
};
togg2.onclick = toggSavane;

function toggMarais(){
  if(getComputedStyle(d3,d4).display != "none"){
    d3.style.display = "none";
    d4.style.display = "none";
  } else {
    d3.style.display = "block";
    d4.style.display = "block";
  }
};
togg2.onclick = toggMarais;


function toggJungle(){
  if(getComputedStyle(d5,d6).display != "none"){
    d5.style.display = "none";
    d6.style.display = "none";
  } else {
    d5.style.display = "block";
    d6.style.display = "block";
  }
};
togg3.onclick = toggJungle;



const DescritpionHabitat1 = document.getElementById("DescriptionSavane");
const DescritpionHabitat2 = document.getElementById("DescriptionMarais");
const DescritpionHabitat3 = document.getElementById("DescriptionJungle");
const TitreHabitat1 = document.getElementById("TitreSavane");
const TitreHabitat2 = document.getElementById("TitreMarais");
const TitreHabitat3 = document.getElementById("TitreJungle");


async function voirHabitat() {
  const myHeaders = new Headers({
    "X-AUTH-TOKEN": "38f1c426526d1aeebb80d777b8733f1ef09fc484",
    "Content-Type": "application/json"
  });

  try {
    const response = await fetch("https://arcadia35380-f680d3a74682.herokuapp.com/api/habitat/get", { method: "GET", headers: myHeaders, mode: "cors" });
    if (!response.ok) throw new Error("Impossible de récupérer les informations des habitats");
    
    const habitats = await response.json();

    // Vérifier que l'array des habitats contient les bons indices
    if (habitats.length >= 3) {
      const [savane, marais, jungle] = habitats;

      document.getElementById("DescriptionSavane").innerHTML = `<p>${savane.description}</p>`;
      document.getElementById("DescriptionMarais").innerHTML = `<p>${marais.description}</p>`;
      document.getElementById("DescriptionJungle").innerHTML = `<p>${jungle.description}</p>`;

      document.getElementById("TitreSavane").innerHTML = `<h2>${savane.nom}</h2>`;
      document.getElementById("TitreMarais").innerHTML = `<h2>${marais.nom}</h2>`;
      document.getElementById("TitreJungle").innerHTML = `<h2>${jungle.nom}</h2>`;
    }
  } catch (error) {
    console.error("Erreur dans la récupération des habitats:", error);
  }
}


// Fonction pour afficher un animal dans sa div


async function voirAnimal() {
  const myHeaders = new Headers({
    "X-AUTH-TOKEN": "38f1c426526d1aeebb80d777b8733f1ef09fc484",
    "Content-Type": "application/json"
  });

  try {
    const response = await fetch("https://arcadia35380-f680d3a74682.herokuapp.com/api/animal/get", { method: "GET", headers: myHeaders, mode: "cors" });
    if (!response.ok) throw new Error("Impossible de récupérer les informations des animaux");
    
    const animals = await response.json();

    const habitatContainers = {
      1: document.getElementById("AnimalSavane"),
      2: document.getElementById("AnimalMarais"),
      3: document.getElementById("AnimalJungle")
    };

    // Nettoyer les conteneurs avant d'ajouter de nouveaux éléments
    Object.values(habitatContainers).forEach(container => container.innerHTML = '');

    animals.forEach(animal => {
      const createdAt = animal.created_at ? new Date(animal.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';
      const feedingTime = animal.feeding_time ? new Date(animal.feeding_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : 'N/A';
      
      const container = habitatContainers[animal.habitat.id];

      if (container) {
        container.innerHTML += `
          <div class="col">
            <img src="data:image/jpeg;base64,${animal.image_data}" alt="Image de ${animal.id}" style="width: 294px; height: 185px;" class="img-thumbnail img-responsive" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidth${animal.id}" aria-expanded="false" aria-controls="collapseWidth${animal.id}">
            <div class="collapse" id="collapseWidth${animal.id}">
              <div class="card card-body mx-auto mb-5">
                <table class="table">
                  <tbody class="text-center">
                    <tr><th scope="row" class="text-dark">Race</th><td class="text-dark">${animal.race.label}</td></tr>
                    <tr><th scope="row" class="text-dark">PRÉNOM</th><td class="text-dark">${animal.prenom}</td></tr>
                    <tr><th scope="row" class="text-dark">ÉTAT de l'animal</th><td class="text-dark">${animal.etat}</td></tr>
                    <tr><th scope="row" class="text-dark">La nourriture proposée</th><td class="text-dark">${animal.nourriture}</td></tr>
                    <tr><th scope="row" class="text-dark">Quantité du dernier repas</th><td class="text-dark">${animal.grammage}</td></tr>
                    <tr><th scope="row" class="text-dark">Dernier passage</th><td class="text-dark">${createdAt}</td></tr>
                    <tr><th scope="row" class="text-dark">Heure de passage</th><td class="text-dark">${feedingTime}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `;
      }
    });
  } catch (error) {
    console.error("Erreur dans la récupération des animaux:", error);
  }
}


