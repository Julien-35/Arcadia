const Avis = document.getElementById("avis");
const putService = document.getElementById("putService");
const PutEmployeBouton = document.getElementById("PutEmployeBouton");

const Service = document.getElementById("service");
const Service2 = document.getElementById("service2");
const Service3 = document.getElementById("service3");
const Service4 = document.getElementById("service4");
const Service5 = document.getElementById("service5");
const Service6 = document.getElementById("service6");



if (document.readyState === "loading") {
  // Loading hasn't finished yet
  Avis.addEventListener('DOMContentLoaded', voirAvis);
} else {
  voirAvis();
}

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', fetchAndPopulatePrenomFilter);
} else {
  fetchAndPopulatePrenomFilter();
}

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', voirService);
} else {
  voirService();
}

// fonction GET et PUT sur les animaux
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  animal.addEventListener('DOMContentLoaded', VoirAnimal);
} else {
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


async function voirAvis() {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken());
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
  };

  try {
      const response = await fetch("http://127.0.0.1:8000/api/avis/get", requestOptions);
      if (!response.ok) throw new Error('Failed to fetch avis');
      
      const result = await response.json();
      let content = '';
      result.forEach(item => {
          const buttonText = item.isVisible ? "Cacher l'avis" : "Afficher l'avis";
          const buttonClass = item.isVisible ? 'btn btn-danger toggle-avis-button' : 'btn btn-success toggle-avis-button';
          content += `
              <ol class="list-group">
                  <li class="list-group-item justify-content-between align-items-start text-dark">
                      <div class="ms-2">
                          <div class="fw-bold">${item.pseudo}</div>
                         <p> ${item.commentaire}</p>
                      </div>
                      <button class="${buttonClass}" data-avis-id="${item.id}" data-avis-visible="${item.isVisible}">
                          ${buttonText}
                      </button>
                  </li>
              </ol>`;
      });
      document.getElementById("avis").innerHTML = content;

      document.querySelectorAll('.toggle-avis-button').forEach(button => {
          button.addEventListener('click', async () => {
              const avisId = button.getAttribute('data-avis-id');
              const currentVisibility = JSON.parse(button.getAttribute('data-avis-visible'));
              const newValue = !currentVisibility;

              try {
                  const putRequestOptions = {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json',
                          'X-AUTH-TOKEN': '38f1c426526d1aeebb80d777b8733f1ef09fc484'
                      },
                      body: JSON.stringify({ isVisible: newValue })
                  };

                  const response = await fetch(`http://127.0.0.1:8000/api/avis/${avisId}`, putRequestOptions);
                  if (!response.ok) throw new Error(`Failed to toggle visibility for avis ${avisId}`);

                  button.setAttribute('data-avis-visible', newValue);
                  button.textContent = newValue ? "Cacher l'avis" : "Afficher l'avis";
                  button.className = newValue ? 'btn btn-danger toggle-avis-button' : 'btn btn-success toggle-avis-button';

              } catch (error) {
                  console.error('Error:', error);
                  alert(`An error occurred while toggling visibility for avis ${avisId}`);
              }
          });
      });

  } catch (error) {
      console.error('Error:', error);
      console.log("Impossible de récupérer les informations d'avis");
  }
}

async function voirService() {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
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
    <div class="text-dark">
      <h2 class="mb-4 col">${item.nom}</h2>
      <p>${item.description}</p>
      <form id="updateForm-${formNumber}" class="update-form">
        <div class="form-group">
          <label for="titre-${formNumber}">Titre:</label>
          <input type="text" id="titre-${formNumber}" name="titre" class="form-control" value="${item.nom}">
        </div>
        <div class="form-group">
          <label for="commentaire-${formNumber}">Commentaire:</label>
          <textarea id="commentaire-${formNumber}" name="commentaire" class="form-control" rows="5">${item.description}</textarea>
        </div>
        <button type="button" class="btn btn-primary" onclick="submitServiceUpdate(${item.id}, ${formNumber})">Mettre à jour</button>
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

  

// Fonction pour voir et modifier mes animaux 


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
    myHeaders.append("X-AUTH-TOKEN", getToken());
  
    try {
      const result = await fetchData("http://127.0.0.1:8000/api/animal/get", myHeaders);
      updateAnimalContent(result, prenomFilter);
    } catch (error) {
      console.error(error);
    }
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
    myHeaders.append("X-AUTH-TOKEN", getToken());
  
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
  
    
  async function updateAnimal(animalId, updatedData) {
    const url = `http://127.0.0.1:8000/api/animal/${animalId}`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(updatedData),
        redirect: "follow",
    };

    try {
        const response = await fetch(url, requestOptions);
        if (response.ok) {
            console.log("Les informations de l'animal ont été mises à jour avec succès.");
        } else {
            throw new Error("Erreur lors de la mise à jour des informations de l'animal");
        }
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
              <th scope="row" class="text-dark">Commentaire sur l'habitat</th>
              <td class="text-dark"><p type="text" id="commentaire${item.id}" class=" text-center text-dark" readonly>${item.habitat.commentaire_habitat}</p></td>
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
        </div>
      </div>`;
  });

  document.getElementById("Animal").innerHTML = content;
}
  
  async function submitUpdate(animalId) {
    const updatedData = {
        nourriture: document.getElementById(`nourriture_${animalId}`).value,
        grammage: document.getElementById(`grammage_${animalId}`).value,
        created_at: document.getElementById(`created_at_${animalId}`).value,
        feeding_time: document.getElementById(`feeding_time_${animalId}`).value
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