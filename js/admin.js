const BtnHoraire = document.getElementById("PutHoraireBouton");
const PutHoraire = document.getElementById("formulaireHoraire");

const PutHabitat = document.getElementById("btnHabitat1");
const formHabitat = document.getElementById("formulaireHabitat1");

// Variable Habitats

const DescritpionHabitat1 = document.getElementById("DescriptionSavane");
const DescritpionHabitat2 = document.getElementById("DescriptionMarais");
const DescritpionHabitat3 = document.getElementById("DescriptionJungle");
const TitreHabitat1 = document.getElementById("TitreSavane");
const TitreHabitat2 = document.getElementById("TitreMarais");
const TitreHabitat3 = document.getElementById("TitreJungle");

BtnHoraire.addEventListener("click",ModifierHoraires);
PutHabitat.addEventListener("click",ModifierHabitat);


// Voir les horaires :
if (document.readyState === "loading") {
  VoirDate();
}

 function ModifierHoraires(){

      let dataForm = new FormData(PutHoraire);

      const myHeaders = new Headers();
      myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        "description": dataForm.get("horaire"),
      });
      
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
   fetch("http://127.0.0.1:8000/api/horaire/2", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


// Fonction voir les habitats 
if (document.readyState === "loading") {
} else {
  voirHabitat();
}

async function voirHabitat(){

  const myHeaders = new Headers();
      myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
      myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    mode:"cors",
  };

await fetch("http://127.0.0.1:8000/api/habitat/get", requestOptions)

.then((response) => {
    if  (response.ok === true){
      return response.json()
    } else
  {
    console.log("Impossible de récupérer les informations des habitats");
  }
})
.then((item)=> {
  let content = 
    `<p>${item[0].description}</p>`

   {

  let content2 =    
      `<p>${item[1].description}</p>`
    {
  let content3 =    
      `<p>${item[2].description}</p>`

      {
    let content4 =         
      `<h2>${item[0].nom}</h2>`
       {    
    let content5 =         
      `<h2>${item[1].nom}</h2>`
      {
    let content6 =         
      `<h2>${item[2].nom}</h2>`

DescritpionHabitat1.innerHTML = content;
DescritpionHabitat2.innerHTML = content2;
DescritpionHabitat3.innerHTML = content3;

TitreHabitat1.innerHTML = content4;
TitreHabitat2.innerHTML = content5;
TitreHabitat3.innerHTML = content6;

}}}}}})
.catch((error) =>  
console.log(error));
}


// fonction pour modifier les habitats 
function ModifierHabitat(){

  let dataForm = new FormData(formHabitat);

  const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
    myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "nom": dataForm.get("TitreHabitat1"),
    "description": dataForm.get("DescriptionHabitat1"),
  });
  
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
   fetch("http://127.0.0.1:8000/api/habitat/1", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}





function updateServiceContent(items) {
  if (items.length >= 3) {
    Service4.innerHTML = `
      <div class="text-dark">
        <h2 class="mb-4 col">${items[0].nom}</h2>
        <p>${items[0].description}</p>
        <form id="updateForm-4" class="update-form">
          <div class="form-group">
            <label for="titre-4">Titre:</label>
            <input type="text" id="titre-4" name="titre" class="form-control" value="${items[0].nom}">
          </div>
     <div class="form-group">
            <label for="commentaire-4">Commentaire:</label>
            <textarea  id="commentaire-4" name="commentaire" class="form-control" rows="5" >${items[0].description}</textarea>
          </div>
          <button type="button" class="btn btn-primary" onclick="submitUpdate(${items[0].id}, 4)">Mettre à jour</button>
        </form>
      </div>`;
      
    Service5.innerHTML = `
      <div class="text-dark">
        <h2 class="mb-4 col">${items[1].nom}</h2>
        <p>${items[1].description}</p>
        <form id="updateForm-5" class="update-form">
          <div class="form-group">
            <label for="titre-5">Titre:</label>
            <input type="text" id="titre-5" name="titre" class="form-control" value="${items[1].nom}">
          </div>
     <div class="form-group">
            <label for="commentaire-5">Commentaire:</label>
            <textarea  id="commentaire-5" name="commentaire" class="form-control" rows="5" >${items[1].description}</textarea>
          </div>
          <button type="button" class="btn btn-primary" onclick="submitUpdate(${items[1].id}, 5)">Mettre à jour</button>
        </form>
      </div>`;
      
    Service6.innerHTML = `
      <div class="text-dark">
        <h2 class="mb-4 col">${items[2].nom}</h2>
        <p>${items[2].description}</p>
        <form id="updateForm-6" class="update-form">
          <div class="form-group">
            <label for="titre-6">Titre:</label>
            <input type="text" id="titre-6" name="titre" class="form-control" value="${items[2].nom}">
          </div>
     <div class="form-group">
            <label for="commentaire-6">Commentaire:</label>
            <textarea  id="commentaire-6" name="commentaire" class="form-control" rows="5" >${items[2].description}</textarea>
          </div>
          <button type="button" class="btn btn-primary" onclick="submitUpdate(${items[2].id}, 6)">Mettre à jour</button>
        </form>
      </div>`;
  } else {
    console.error("Moins de trois services trouvés.");
  }
}


async function submitUpdate(serviceId, formNumber) {
  const form = document.getElementById(`updateForm-${formNumber}`);
  const formData = new FormData(form);
  const titre = formData.get('titre');
  const commentaire = formData.get('commentaire');
  
  console.log(`Updating Service ID: ${serviceId} with Title: ${titre}, Comment: ${commentaire}`);
  
  try {
    await ModifierServices(serviceId, titre, commentaire);
    alert("Les informations du service ont été mises à jour avec succès");
    // Actualiser la liste des services après la mise à jour
    voirService();
  } catch (error) {
    alert("Erreur lors de la mise à jour des informations du service");
    console.error(error);
  }
}

async function ModifierServices(serviceId, titre, commentaire) {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "nom": titre,
    "description": commentaire
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/service/${serviceId}`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}


const Service4 = document.getElementById("service4");
const Service5 = document.getElementById("service5");
const Service6 = document.getElementById("service6");

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', voirService);
} else {
  voirService();
}

async function voirService() {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    mode: "cors",
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/api/service/get", requestOptions);
    if (!response.ok) {
      throw new Error("Impossible de récupérer les informations utilisateur");
    }
    const items = await response.json();
    updateServiceContent(items);
  } catch (error) {
    console.error('Error:', error);
  }
}



const rapportsContainer = document.getElementById("rapportVeterinaire1");
const filterByDateInput = document.getElementById("filterByDate");
const filterByAnimalInput = document.getElementById("filterByAnimal");
const applyFiltersButton = document.getElementById("applyFilters");

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', VoirRapport);
} else {
  VoirRapport();
}

async function VoirRapport() {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/api/rapportveterinaire/get", requestOptions);
    if (!response.ok) {
      throw new Error("Impossible de récupérer les rapports");
    }
    const result = await response.json();
    
    // Stocker les données pour les filtres
    window.rapportsData = result;

    // Afficher tous les rapports par défaut
    afficherRapports(result);

  } catch (error) {
    console.error("Erreur:", error);
  }
}

function afficherRapports(data) {
  // Vider le conteneur des rapports existants, au cas où
  rapportsContainer.innerHTML = '';

  // Construire le contenu HTML à afficher
  let content = '';
  data.forEach(item => {
    content += `
      <div class="rapport-item mb-2 border">
        <div>${item.date}</div>
        <div>${item.Animal.prenom}</div>
        <div>${item.detail}</div>
      </div>
    `;
  });

  rapportsContainer.innerHTML = content;
}

// Fonction de filtrage
function appliquerFiltres() {
  const dateFiltre = filterByDateInput.value;
  const animalFiltre = filterByAnimalInput.value.toLowerCase();

  const rapportsFiltres = window.rapportsData.filter(rapport => {
    const correspondDate = dateFiltre ? rapport.date.includes(dateFiltre) : true;
    const correspondAnimal = animalFiltre ? rapport.Animal.prenom.toLowerCase().includes(animalFiltre) : true;
    return correspondDate && correspondAnimal;
  });

  afficherRapports(rapportsFiltres);
}

// Ajouter l'écouteur d'événements pour le bouton de filtre
applyFiltersButton.addEventListener('click', appliquerFiltres);
