

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  animal.addEventListener('DOMContentLoaded', VoirAnimal);
} else {
  // `DOMContentLoaded` has already fired
  VoirAnimal();
}
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

async function VoirAnimal() {
  const prenomFilter = document.getElementById("prenomFilter").value;

  if (!prenomFilter) {
    document.getElementById("Animal").innerHTML = '';
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-AUTH-TOKEN", getToken());

  try {
    const result = await fetchData("https://arcadia35380-f680d3a74682.herokuapp.com/api/animal/get", myHeaders);
    updateAnimalContent(result, prenomFilter);
  } catch (error) {
    console.error('Error:', error);
  }
}


// Fonction pour mettre à jour le filtre des prénoms
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

// Fonction pour récupérer et peupler le filtre des prénoms
async function fetchAndPopulatePrenomFilter() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-AUTH-TOKEN", getToken());

  try {
    const result = await fetchData("https://arcadia35380-f680d3a74682.herokuapp.com/api/animal/get", myHeaders);
    updatePrenomFilter(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', fetchAndPopulatePrenomFilter);
} else {
  fetchAndPopulatePrenomFilter();
}

  
async function updateAnimal(animalId, updatedData) {
  const url = `https://arcadia35380-f680d3a74682.herokuapp.com/api/animal/${animalId}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-AUTH-TOKEN",  getToken());

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(updatedData),
    redirect: "follow",
    mode: "cors"
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) throw new Error("Erreur lors de la mise à jour des informations de l'animal");
    console.log("Les informations de l'animal ont été mises à jour avec succès.");
  } catch (error) {
    console.error(error);
  }
}


  
// Fonction pour mettre à jour le contenu de l'animal
function updateAnimalContent(items, prenomFilter) {
  const filteredItems = items.filter(item => item.prenom === prenomFilter);

  let content = '';
  filteredItems.forEach(item => {
    const habitatName = item.habitat ? item.habitat.nom : 'N/A';

    const raceLabel = item.race ? item.race.label : 'N/A';
    const createdAt = item.created_at ? item.created_at.split('T')[0] : '';
    const feedingTime = item.feeding_time ? item.feeding_time.split('T')[1].slice(0, 5) : '';

    content += `
    <div class="d-flex justify-content flex-column">
      <table class="table container">
        <tbody class="text-center">
          <tr>
            <th scope="row" class="text-dark">Habitat</th>
            <td class="text-dark"><p type="text" id="habitat_${item.id}" class="text-center text-dark">${habitatName}</p></td>
          </tr>

          <tr>
            <th scope="row" class="text-dark">Race</th>
            <td class="text-dark"><p type="text" id="race_${item.id}" class="text-center text-dark">${raceLabel}</p></td>
          </tr>
          <tr>
            <th scope="row" class="text-dark">PRENOM</th>
            <td class="text-dark"><p type="text" id="prenom_${item.id}" class="text-center text-dark">${item.prenom}</p></td>
          </tr>
          
          <tr>
            <th scope="row" class="text-dark">ETAT de l'animal</th>
            <td class="text-dark"><input type="text" id="etat_${item.id}" class="border border-primary rounded text-center text-dark" value="${item.etat}"></td>
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
            <th scope="row" class="text-dark">Dernier passage</th>
            <td class="text-dark"><input type="date" id="created_at_${item.id}" class="border border-primary rounded text-center text-dark" value="${createdAt}"></td>
          </tr>
          <tr>
            <th scope="row" class="text-dark">Heure</th>
            <td class="text-dark"><input type="time" id="feeding_time_${item.id}" class="border border-primary rounded text-center text-dark" value="${feedingTime}"></td>
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
      </div>
    </div>`;
  });

  document.getElementById("Animal").innerHTML = content;
}

async function submitUpdate(animalId) {
  const updatedData = {
    prenom: document.getElementById(`prenom_${animalId}`).value,
    etat: document.getElementById(`etat_${animalId}`).value,
    nourriture: document.getElementById(`nourriture_${animalId}`).value,
    grammage: document.getElementById(`grammage_${animalId}`).value,
    habitat_id: document.getElementById(`habitat_${animalId}`).value,
    race_id: document.getElementById(`race_${animalId}`).value,
    created_at: document.getElementById(`created_at_${animalId}`).value,
    feeding_time: document.getElementById(`feeding_time_${animalId}`).value,
    };

  const fileInput = document.getElementById(`image_data_${animalId}`);
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      updatedData.image_data = reader.result.split(',')[1]; // Extract Base64 part
      await updateAnimal(animalId, updatedData);
    };

    reader.readAsDataURL(file); // Read file as data URL
  } else {
    await updateAnimal(animalId, updatedData);
  }
}


// Fonction pour mettre à jour le contenu des rapports vétérinaires
function updateRapportContent(rapports) {
  let content = '';
  rapports.forEach(rapport => {
    const date = rapport.date ? rapport.date.split('T')[0] : '';
    const detail = rapport.detail || 'N/A';

    content += `
    <div class="d-flex justify-content flex-column text-dark text-center">
      <table class="table container">
        <tbody class="text-center">
          <tr>
            <th scope="row" class="text-dark">Date</th>
            <td class="text-dark"><input type="date" id="date_${rapport.id}" class="border border-primary rounded text-center text-dark" value="${date}"></td>
          </tr>
          <tr>
            <th scope="row" class="text-dark">Détail</th>
            <td class="text-dark"><textarea id="detail_${rapport.id}" class="container border border-primary rounded text-center text-dark">${detail}</textarea></td>
          </tr>
        </tbody>
      </table>
      <div class="container mb-2">
        <button onclick="submitUpdateRapport(${rapport.id})" class="btn btn-primary text-center">Modifier</button>
      </div>
    </div>`;
  });

  document.getElementById("Rapports").innerHTML = content;
}



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
  myHeaders.append("X-AUTH-TOKEN",  getToken());
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    mode: "cors",
  };

  try {
    const response = await fetch("https://arcadia35380-f680d3a74682.herokuapp.com/api/habitat/get", requestOptions);
    if (!response.ok) throw new Error("Impossible de récupérer les informations des habitats");
    
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
      <p>${item.commentaireHabitat}</p>
      <hr>
      <form id="updateForms-${formNumber}" class="update-form">
        <div class="form-group text-dark">
        </div>
        <div class="form-group m-3">
          <label for="commentaireHabitat-${formNumber}">Modifier le commentaire sur l'habitat :</label>
          <textarea id="commentaireHabitat-${formNumber}" name="commentaireHabitat" class="form-control text-dark text-center" rows="5">${item.commentaireHabitat}</textarea>
        </div>
        <button type="button" class="btn btn-primary m-3" onclick="submitHabitatUpdate(${item.id}, ${formNumber})">Mettre à jour</button>
      </form>
    </div>`;
}

async function submitHabitatUpdate(habitatId, formNumber) {
  const form = document.getElementById(`updateForms-${formNumber}`);
  const formData = new FormData(form);
  const commentaireHabitat = formData.get('commentaireHabitat');

  if (!commentaireHabitat) {
    alert("Le champ commentaire ne peut pas être vide");
    return;
  }

  console.log(`Updating Habitat ID: ${habitatId} with Commentaire Habitat: ${commentaireHabitat}`);

  try {
    await ModifierHabitat(habitatId, commentaireHabitat);
    alert("Les informations de l'habitat ont été mises à jour avec succès");
    voirHabitat(); // Assurez-vous que cette fonction est définie et qu'elle recharge les données correctement
  } catch (error) {
    alert("Erreur lors de la mise à jour des informations de l'habitat");
    console.error(error);
  }
}

async function ModifierHabitat(habitatId, commentaireHabitat) {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken()); // Assurez-vous que `getToken` est défini
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    commentaireHabitat: commentaireHabitat
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch(`https://arcadia35380-f680d3a74682.herokuapp.com/api/habitat/${habitatId}`, requestOptions);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


// Method POST pour ajouter un rapport en indiquand le prénom de l'animal

document.getElementById('rapportForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Récupération des valeurs du formulaire
  const date = document.getElementById('date').value;
  const detail = document.getElementById('detail').value;
  const animalPrenom = document.getElementById('animalPrenom').value; 

  // Vérification des valeurs
  console.log('Date:', date);
  console.log('Détail:', detail);
  console.log('Prénom Animal:', animalPrenom);

  // Préparation des en-têtes
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Construction du corps de la requête
  const raw = JSON.stringify({
      date: date,
      detail: detail,
      animal: {
          prenom: animalPrenom
      }
  });

  // Préparation des options de la requête
  const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
  };

  try {
      // Envoi de la requête
      const response = await fetch("https://arcadia35380-f680d3a74682.herokuapp.com/api/rapportveterinaire/post", requestOptions);

      // Vérification de la réponse
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      // Affichage du résultat
      console.log(result);
      alert("Rapport ajouté avec succès!");
  } catch (error) {
      console.error(error);
      alert("Une erreur est survenue !");
  }
});