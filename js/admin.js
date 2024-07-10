// Consolidation de l'événement DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  chargerHoraires();
  voirService();
  voirHabitat();
});

// Récupération des éléments du DOM
const BtnHoraire = document.getElementById("PutHoraireBouton");

// Ajout de l'écouteur d'événement pour le bouton
BtnHoraire.addEventListener("click", ModifierHoraires);

// Fonction pour charger les horaires
function chargerHoraires() {
  fetch("http://localhost:8080/api/horaires")
    .then(response => response.json())
    .then(data => {
      if (data.length) {
        document.getElementById("titreInput").value = data[0].titre;
        document.getElementById("messageInput").value = data[0].message;
        document.getElementById("heureDebutInput").value = data[0].heureDebut;
        document.getElementById("heureFinInput").value = data[0].heureFin;
        document.getElementById("jourInput").value = data[0].jour;
      }
    });
}

document.getElementById("PutHoraireBouton").addEventListener("click", () => {
  const data = {
    titre: document.getElementById("titreInput").value,
    message: document.getElementById("messageInput").value,
    heureDebut: document.getElementById("heureDebutInput").value,
    heureFin: document.getElementById("heureFinInput").value,
    jour: document.getElementById("jourInput").value
  };

  fetch("http://localhost:8080/api/horaires", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(result => console.log(result));
});

// Fonction pour modifier les horaires
async function ModifierHoraires() {
  const formData = new FormData(document.getElementById("formulaireHoraire"));
  const data = {
    titre: formData.get('titre'),
    message: formData.get('message'),
    heureDebut: formData.get('heureDebut'),
    heureFin: formData.get('heureFin'),
    jour: formData.get('jour')
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/api/horaire/2", {
      method: "PUT",
      headers: {
        "X-AUTH-TOKEN": "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    console.log(result);
    alert("Les horaires ont été mis à jour avec succès.");
  } catch (error) {
    console.error('Error:', error);
    alert("Erreur lors de la mise à jour des horaires.");
  }
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


// Fonction pour afficher et modifier les services

function updateServiceContent(items) {
  if (items.length >= 3) {
    Service4.innerHTML = createServiceHTML(items[0], 4);
    Service5.innerHTML = createServiceHTML(items[1], 5);
    Service6.innerHTML = createServiceHTML(items[2], 6);
  } else {
    console.error("Moins de trois services trouvés.");
  }
}

function createServiceHTML(item, formNumber) {
  return `
    <div class="text-dark text-center">
      <h2 class="mb-4 col">${item.nom}</h2>
      <p>${item.description}</p>
      <form id="updateForm-${formNumber}" class="update-form text-center text-dark">
        <div class="form-group mt-3" >
          <h5 for="titre-${formNumber}" class="text-center text-dark" >Titre:</h5>
          <input type="text" id="titre-${formNumber}" name="titre" class="form-control text-center text-dark" value="${item.nom}" >
        </div>
        <div class="form-group m-2">
          <h5 for="commentaire-${formNumber}">Commentaire:</h5>
          <textarea id="commentaire-${formNumber}" name="commentaire" class="form-control text-center text-dark" rows="5">${item.description}</textarea>
        </div>
        <button type="button" class="btn btn-primary m-5" onclick="submitServiceUpdate(${item.id}, ${formNumber})">Mettre à jour</button>
      </form>
    </div>`;
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
(
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
})

// Voir les 3 services
const Service4 = document.getElementById("service4");
const Service5 = document.getElementById("service5");
const Service6 = document.getElementById("service6");

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', voirService);
} else {
  voirService();
}
async function submitServiceUpdate(serviceId, formNumber) {
  const form = document.getElementById(`updateForm-${formNumber}`);
  const formData = new FormData(form);
  const titre = formData.get('titre');
  const commentaire = formData.get('commentaire');

  if (!titre || !commentaire) {
    alert("Les champs titre et commentaire ne peuvent pas être vides");
    return;
  }

  console.log(`Updating Service ID: ${serviceId} with Title: ${titre}, Comment: ${commentaire}`);

  try {
    await ModifierServices(serviceId, titre, commentaire);
    alert("Les informations du service ont été mises à jour avec succès");
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

// Fonction pour formater une date en JJ/MM/AAAA
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Fonction pour voir les rapports vétérinaires filtrés par date ou prénom
async function voirRapport(date = "", prenom = "") {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
  };

  try {
      const response = await fetch("http://127.0.0.1:8000/api/rapportveterinaire/get", requestOptions);
      if (!response.ok) {
          console.log("Impossible de récupérer les rapports");
          return;
      }
      const result = await response.json();

      // Filtrer les rapports en fonction de la date ou du prénom spécifié
      let filteredResult = result;

      if (date) {
          const formattedDate = new Date(date).toLocaleDateString('fr-FR'); // Format JJ/MM/AAAA
          filteredResult = filteredResult.filter(item => {
              const reportDate = new Date(item.date).toLocaleDateString('fr-FR');
              return reportDate === formattedDate;
          });
      } else if (prenom) {
          filteredResult = filteredResult.filter(item => item.animal.prenom.toLowerCase() === prenom.toLowerCase());
      }

      // Trier les rapports par date
      filteredResult.sort((a, b) => new Date(a.date) - new Date(b.date));

      let content = '';
      if (filteredResult.length === 0) {
          content = "<p>Aucun rapport trouvé avec les critères spécifiés.</p>";
      } else {
          filteredResult.forEach(item => {
              const formattedDate = formatDate(item.date);
              content += `
              <div class="border border-black rounded">
                  <p class="fw-bold fs-4">${formattedDate}</p>
                  <p class="fw-normal fs-4">${item.detail}</p>
                  <p class="fw-normal fs-4">${item.animal.prenom}</p>
                  </div>
              `;
          });
      }
      seeRapport.innerHTML = content;
  } catch (error) {
      console.log(error);
  }
}

// Fonction pour récupérer et peupler le filtre des prénoms
async function fetchAndPopulatePrenomFilter() {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
  };

  try {
      const response = await fetch("http://127.0.0.1:8000/api/rapportveterinaire/get", requestOptions);
      if (!response.ok) {
          console.log("Impossible de récupérer les rapports");
          return;
      }
      const result = await response.json();
      
      // Extraire les prénoms des animaux des rapports
      const prénoms = [...new Set(result.map(item => item.animal.prenom))];
      console.log(prénoms); // Vérifiez les prénoms extraits

      // Mettre à jour la liste déroulante des prénoms
      updatePrenomFilter(prénoms);
  } catch (error) {
      console.error(error);
  }
}

// Fonction pour mettre à jour le filtre des prénoms (si nécessaire)
function updatePrenomFilter(prénoms) {
  // Cette fonction n'est plus nécessaire si on remplace le champ de sélection par un champ de saisie
}

const seeRapport = document.getElementById("rapport");

// Ajouter un écouteur d'événements pour filtrer les rapports par date ou prénom
document.getElementById("filterButton").addEventListener("click", () => {
  const date = document.getElementById("dateFilter").value;
  const prenom = document.getElementById("prenomFilter").value;
  voirRapport(date, prenom); // Appeler voirRapport avec les critères sélectionnés
});

// Charger les options des prénoms au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  fetchAndPopulatePrenomFilter();
});





if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', voirHabitat);
} else {
  voirHabitat();
}

const habitat1 = document.getElementById("habitat1");
const habitat2 = document.getElementById("habitat2");
const habitat3 = document.getElementById("habitat3");

  
async function voirHabitat() {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
  };

  try {
      const response = await fetch("http://127.0.0.1:8000/api/habitat/get", requestOptions);
      if (!response.ok) {
          throw new Error("Impossible de récupérer les informations utilisateur");
      }
      const items = await response.json();
      updateHabitatContent(items);
  } catch (error) {
      console.error('Error:', error);
  }
}

function updateHabitatContent(items) {
  if (items.length >= 3) {
      habitat1.innerHTML = createHabitatHTML(items[0], 4);
      habitat2.innerHTML = createHabitatHTML(items[1], 5);
      habitat3.innerHTML = createHabitatHTML(items[2], 6);
  } else {
      console.error("Moins de trois habitats trouvés.");
  }
}

function createHabitatHTML(item, formNumber) {
  return `
      <div class="text-dark text-center">
          <h2 class="mb-4 col">${item.nom}</h2>
          <p>${item.description}</p>
          <hr>
          <form id="updateForms-${formNumber}" class="update-form">
              <div class="form-group text-dark">
                  <label class="text-dark" for="nom-${formNumber}" >Titre:</label>
                  <input type="text" id="nom-${formNumber}" name="nom" class="form-control text-dark text-center" value="${item.nom}">
              </div>
              <div class="form-group">
                  <label for="description-${formNumber}">Description:</label>
                  <textarea id="description-${formNumber}" name="description" class="form-control text-dark text-center" rows="5">${item.description}</textarea>
              </div>
              <button type="button" class="btn btn-primary" onclick="submitHabitatUpdate(${item.id}, ${formNumber})">Mettre à jour</button>
          </form>
      </div>`;
}

async function submitHabitatUpdate(habitatId, formNumber) {
  const form = document.getElementById(`updateForms-${formNumber}`);
  const formData = new FormData(form);
  const nom = formData.get('nom');
  const description = formData.get('description');

  if (!nom || !description) {
      alert("Les champs nom et description ne peuvent pas être vides");
      return;
  }

  console.log(`Updating Habitat ID: ${habitatId} with Title: ${nom}, Description: ${description}`);

  try {
      await ModifierHabitat(habitatId, nom, description);
      alert("Les informations du service ont été mises à jour avec succès");
      voirHabitat();
  } catch (error) {
      alert("Erreur lors de la mise à jour des informations du service");
      console.error(error);
  }
}

async function ModifierHabitat(habitatId, nom, description) {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
      nom: nom,
      description: description
  });

  const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
  };

  try {
      const response = await fetch(`http://127.0.0.1:8000/api/habitat/${habitatId}`, requestOptions);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.text();
      console.log(result);
  } catch (error) {
      console.error('Error:', error);
  }
}