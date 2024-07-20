// Consolidation de l'événement DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  chargerHoraires();
  voirService();
  voirHabitat();
});

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
// Récupération des éléments du DOM
const BtnHoraire = document.getElementById("PutHoraireBouton");

// Ajout de l'écouteur d'événement pour le bouton
BtnHoraire.addEventListener("click", ModifierHoraires);

// Fonction pour charger les horaires
function chargerHoraires() {
  fetch("http://localhost:8000/api/horaires/get")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        document.getElementById("titreInput").value = data[0].titre;
        document.getElementById("messageInput").value = data[0].message;
        document.getElementById("heureDebutInput").value = data[0].heureDebut;
        document.getElementById("heureFinInput").value = data[0].heureFin;
        document.getElementById("jourInput").value = data[0].jour;
      } else {
        console.log("No horaires found");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Fonction pour modifier les horaires
async function ModifierHoraires() {
  const form = document.getElementById("formulaireHoraire");
  const formData = new FormData(form);

  const data = {
    titre: formData.get('titre'),
    message: formData.get('message'),
    heureDebut: formData.get('heureDebut'),
    heureFin: formData.get('heureFin'),
    jour: formData.get('jour')
  };

  try {
    const response = await fetch("http://localhost:8000/api/horaires/2", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": getToken()
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

async function creerUnService() {
  const form = document.getElementById("createServiceForm");
  const formData = new FormData(form);
  const titre = formData.get('titre');
  const commentaire = formData.get('commentaire');

  if (!titre || !commentaire) {
    alert("Les champs titre et commentaire ne peuvent pas être vides");
    return;
  }

  try {
    await createService(titre, commentaire);
    alert("Le service a été créé avec succès");
    voirService(); // Actualiser la liste des services après la création
  } catch (error) {
    alert("Erreur lors de la création du service");
    console.error(error);
  }
}

async function createService(titre, commentaire) {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken());
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "nom": titre,
    "description": commentaire
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/service/post`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}


async function voirService() {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");

  try {
    const items = await fetchData("http://127.0.0.1:8000/api/service/get", myHeaders);
    const servicesContainer = document.getElementById("services-container");
    servicesContainer.innerHTML = ''; 
    
    items.forEach((item, index) => {
      const serviceElement = document.createElement('div');
      serviceElement.className = 'service-item';
      serviceElement.innerHTML = createServiceHTML(item, index);
      servicesContainer.appendChild(serviceElement);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}


function createServiceHTML(item, index) {
  return `
    <div class="text-dark text-center border border-secondary rounded p-2">
      <h2 class="mb-4 col">${item.nom}</h2>
      <p>${item.description}</p>
      <form id="updateForm-${index}" class="update-form text-center text-dark">
        <div class="form-group text-dark text-center">
          <label for="titre-${index}">Titre:</label>
          <input type="text" id="titre-${index}" name="titre" class="form-control text-dark text-center" value="${item.nom}">
        </div>
        <div class="form-group">
          <label for="commentaire-${index}">Commentaire:</label>
          <textarea id="commentaire-${index}" name="commentaire" class="form-control text-dark text-center" rows="5">${item.description}</textarea>
        </div>
        <button type="button" class="btn btn-primary m-3" onclick="submitServiceUpdate(${item.id}, ${index})">Mettre à jour</button>
        <button type="button" class="btn btn-danger" onclick="deleteService(${item.id})">Supprimer</button>
      </form>
    </div>`;
}

async function deleteService(serviceId) {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken());

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/service/${serviceId}`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert("Le service a été supprimé avec succès");
    voirService(); // Actualiser la liste des services après la suppression
  } catch (error) {
    alert("Erreur lors de la suppression du service");
    console.error(error);
  }
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
(
  async function ModifierServices(serviceId, titre, commentaire) {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
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
  myHeaders.append("X-AUTH-TOKEN", getToken());
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
  myHeaders.append("X-AUTH-TOKEN", getToken());
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
  myHeaders.append("X-AUTH-TOKEN", getToken());
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
  myHeaders.append("X-AUTH-TOKEN", getToken());
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
          <form id="updateForms-${formNumber}" class="update-form mt-3">
              <div class="form-group text-dark">
                  <label class="text-dark" for="nom-${formNumber}" ><h5 class="mt-3">Modifier le titre </h5></label>
                  <input type="text" id="nom-${formNumber}" name="nom" class="form-control text-dark text-center" value="${item.nom}">
              </div>
              <div class="form-group p-2">
                  <label for="description-${formNumber}"><h5 class="my-2">Modifier la description </h5></label>
                  <textarea id="description-${formNumber}" name="description" class="form-control text-dark text-center" rows="5">${item.description}</textarea>
              </div>
              <button type="button" class="btn btn-primary my-3" onclick="submitHabitatUpdate(${item.id}, ${formNumber})">Mettre à jour</button>
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
  myHeaders.append("X-AUTH-TOKEN", getToken());
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


(function() {
  emailjs.init("hiebLS3jQ2Yh7c-d-");
})();

const InputPrenom = document.getElementById("PrenomInput");
const InputNom = document.getElementById("NomInput");
const InputEmail = document.getElementById("EmailInput");
const InputPassword = document.getElementById("PasswordInput");
const InputRole = document.getElementById("RoleInput"); 
const btnInscription = document.getElementById("btnInscription");
const FormInscription = document.getElementById("formulaireInscription");

InputPrenom.addEventListener("keyup", validateForm);
InputNom.addEventListener("keyup", validateForm);
InputEmail.addEventListener("keyup", validateForm);
InputPassword.addEventListener("keyup", validateForm);
InputRole.addEventListener("change", validateForm);
btnInscription.addEventListener("click", InscrireUtilisateur);

function validateForm() {
    const PrenomOk = validatePrenom(InputPrenom);
    const NomOk = validateNom(InputNom);
    const pwdOk = validatePassword(InputPassword);
    const mailOk = validateMail(InputEmail);
    const roleOk = validateRole(InputRole);

    btnInscription.disabled = !(PrenomOk && NomOk && pwdOk && mailOk && roleOk);
}

function validateMail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validatePassword(input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validatePrenom(input) {
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateNom(input) {
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateRole(input) {
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function InscrireUtilisateur(event) {
    event.preventDefault();

    let dataForm = new FormData(FormInscription);
    let userData = {
        "prenom": dataForm.get("prenom"),
        "nom": dataForm.get("nom"),
        "email": dataForm.get("email"),
        "password": dataForm.get("password"),
        "role": dataForm.get("role")
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(userData);

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/registration", requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorText => {
                    throw new Error(`Erreur ${response.status}: ${errorText}`);
                });
            }
            return response.json();
        })
        .then(result => {
            console.log("Inscription réussie:", result);

            let templateParams = {
                message: `Bienvenue ${userData.prenom} ${userData.nom} ! 
                
                Votre compte Arcadia vient d'être créé.`,
                from_name: `${userData.prenom} ${userData.nom}`,
                to_email: userData.email,
                
            };

            emailjs.send('service_veuyjvv', 'templateId', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Inscription réussie et e-mail envoyé!');
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Inscription réussie mais échec de l\'envoi du message.');
                });
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'inscription. Veuillez vérifier les données.');
        });
}




if (document.readyState === "loading") {
  // Loading hasn't finished yet
  animal.addEventListener('DOMContentLoaded', VoirAnimal);
} else {
  // `DOMContentLoaded` has already fired
  VoirAnimal();
}

async function fetchData(url, headers) {
  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Impossible de récupérer les informations utilisateur");
  }
}

async function VoirAnimal() {
  const prenomFilter = document.getElementById("prenomFilter").value;

  if (!prenomFilter) {
    document.getElementById("Animal").innerHTML = '';
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("X-AUTH-TOKEN", getToken());

  try {
    const result = await fetchData("http://127.0.0.1:8000/api/animal/get", myHeaders);
    updateAnimalContent(result, prenomFilter);
  } catch (error) {
    console.error(error);
  }
}
function updateAnimalContent(items, prenomFilter) {
  const filteredItems = items.filter(item => item.prenom === prenomFilter);

  let content = '';
  filteredItems.forEach(item => {
      const createdAt = item.created_at ? item.created_at.split('T')[0] : '';
      const feedingTime = item.feeding_time ? item.feeding_time.split('T')[1].slice(0, 5) : '';

      content += `
      <div class="d-flex justify-content flex-column">
        <table class="table container">
          <tbody class="text-center ">
            <tr>
              <th scope="row" class="text-dark">PRENOM</th>
              <td class="text-dark"><p type="text" id="prenom_${item.id}" class=" text-center text-dark" readonly>${item.prenom}</p></td>
            </tr>
             <tr>
              <th scope="row" class="text-dark">Etat</th>
              <td class="text-dark"><p type="text" id="etat${item.id}" class=" text-center text-dark" readonly>${item.etat}</p></td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Nom de l'habitat</th>
              <td class="text-dark"><p type="text" id="nom${item.id}" class=" text-center text-dark" readonly>${item.habitat.nom}</p></td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Nom de la race</th>
              <td class="text-dark"><p type="text" id="race${item.id}" class=" text-center text-dark" readonly>${item.race.label}</p></td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Date du dernier repas</th>
              <td class="text-dark"><input type="date" id="created_at_${item.id}" class="border border-primary rounded text-center text-dark" value="${createdAt}"></td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Heure du repas</th>
              <td class="text-dark"><input type="time" id="feeding_time_${item.id}" class="border border-primary rounded text-center text-dark" value="${feedingTime}"></td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">La nourriture proposée</th>
              <td class="text-dark"><input type="text" id="nourriture_${item.id}" class="border border-primary rounded text-center text-dark" value="${item.nourriture}"></td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Quantité du dernier repas</th>
              <td class="text-dark"><input type="text" id="grammage_${item.id}" class="border border-primary rounded text-center text-dark" value="${item.grammage}"></td>
            </tr>

            <tr>
              <th scope="row" class="text-dark">Image</th>
              <td class="text-dark">
                <img src="data:image/jpeg;base64,${item.image_data}" alt="Image de ${item.prenom}" class="img-thumbnail w-50" id="image_${item.id}">
                <input type="file" id="image_data_${item.id}" class="form-control mt-2">
              </td>
            </tr>
          </tbody>
        </table>
      <div class="container mb-2">
        <button onclick="submitUpdate(${item.id})" class="btn btn-primary text-center">Modifier</button>
        <button onclick="deleteAnimal(${item.id})" class="btn btn-danger text-center">Supprimer</button>
      </div>
      </div>`;
  });

  document.getElementById("Animal").innerHTML = content;
}
  

function updatePrenomFilter(items) {
  const prenomFilter = document.getElementById("prenomFilter");
  
  // Utiliser un Set pour stocker les prénoms uniques avec leurs races associées
  const prénoms = [...new Set(items.map(item => `${item.prenom} (${item.race.label})`))];

  prenomFilter.innerHTML = '<option value="">Sélectionnez un prénom</option>';
  prénoms.forEach(prenom => {
    const option = document.createElement("option");
    option.value = prenom.split(" (")[0]; // Extraire le prénom pour la valeur
    option.textContent = prenom; // Afficher prénom avec race entre parenthèses
    prenomFilter.appendChild(option);
  });
}

async function fetchAndPopulatePrenomFilter() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("X-AUTH-TOKEN", getToken());

  try {
    const result = await fetchData("http://127.0.0.1:8000/api/animal/get", myHeaders);
    updatePrenomFilter(result);
  } catch (error) {
    console.error(error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', fetchAndPopulatePrenomFilter);
} else {
  fetchAndPopulatePrenomFilter();
}



async function submitAnimal() {
  const prenom = document.getElementById('prenom').value;
  const etat = document.getElementById('etat').value;
  const nourriture = document.getElementById('nourriture').value;
  const grammage = document.getElementById('grammage').value;
  const habitatSelect = document.getElementById('habitat');
  const habitat_id = habitatSelect.value; // Utilisez l'ID sélectionné
  const race_id = document.getElementById('race_id').value;
  const created_at = document.getElementById('created_at').value;
  const feeding_time = document.getElementById('feeding_time').value;

  const fileInput = document.getElementById('image_data');
  let image_data = '';

  if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
          image_data = reader.result.split(',')[1]; // Extraire la partie base64

          const data = {
              prenom: prenom,
              etat: etat,
              nourriture: nourriture,
              grammage: grammage,
              habitat_id: parseInt(habitat_id),
              race_id: parseInt(race_id),
              image_data: image_data,
              created_at: created_at,
              feeding_time: feeding_time
          };

          try {
              const response = await fetch("http://127.0.0.1:8000/api/animal/post", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(data)
              });

              if (response.ok) {
                  const result = await response.json();
                  document.getElementById('responseMessage').innerText = "Animal ajouté avec succès!";
              } else {
                  const error = await response.json();
                  document.getElementById('responseMessage').innerText = `Erreur: ${error.error}`;
              }
          } catch (error) {
              console.error('Erreur:', error);
              document.getElementById('responseMessage').innerText = `Erreur: ${error.message}`;
          }
      };

      reader.readAsDataURL(file); // Lire le fichier comme URL de données
  } else {
      const data = {
          prenom: prenom,
          etat: etat,
          nourriture: nourriture,
          grammage: grammage,
          habitat_id: parseInt(habitat_id),
          race_id: parseInt(race_id),
          created_at: created_at,
          feeding_time: feeding_time
      };

      try {
          const response = await fetch("http://127.0.0.1:8000/api/animal/post", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
          });

          if (response.ok) {
              const result = await response.json();
              document.getElementById('responseMessage').innerText = "Animal ajouté avec succès!";
          } else {
              const error = await response.json();
              document.getElementById('responseMessage').innerText = `Erreur: ${error.error}`;
          }
      } catch (error) {
          console.error('Erreur:', error);
          document.getElementById('responseMessage').innerText = `Erreur: ${error.message}`;
      }
  }
}



async function deleteAnimal(animalId) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet animal ?")) {
      return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("X-AUTH-TOKEN", getToken());

  const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
  };

  try {
      const response = await fetch(`http://127.0.0.1:8000/api/animal/${animalId}`, requestOptions);
      if (response.ok) {
          alert("Animal supprimé avec succès.");
          VoirAnimal(); // Recharger les animaux après suppression
      } else {
          throw new Error("Erreur lors de la suppression de l'animal");
      }
  } catch (error) {
      console.error('Erreur:', error);
      alert("Erreur lors de la suppression de l'animal.");
  }
}




async function fetchHabitats() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  try {
      const response = await fetch("http://127.0.0.1:8000/api/habitat/get", {
          method: "GET",
          headers: myHeaders,
      });

      if (response.ok) {
          return await response.json(); // Supposons que l'API renvoie un tableau d'habitats
      } else {
          throw new Error("Erreur lors de la récupération des habitats");
      }
  } catch (error) {
      console.error("Erreur:", error);
      return [];
  }
}



async function populateHabitatSelect() {
  const habitatSelect = document.getElementById("habitat");
  const habitats = await fetchHabitats();

  habitats.forEach(habitat => {
      const option = document.createElement("option");
      option.value = habitat.id; // Utilisez l'ID comme valeur pour envoyer au serveur
      option.textContent = habitat.nom; // Utilisez le nom pour afficher dans le sélecteur
      habitatSelect.appendChild(option);
  });
}

// Appel de la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', populateHabitatSelect);