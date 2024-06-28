const Avis = document.getElementById("avis");
const putService = document.getElementById("putService");
const PutEmployeBouton = document.getElementById("PutEmployeBouton");

const Service = document.getElementById("service");
const Service2 = document.getElementById("service2");
const Service3 = document.getElementById("service3");



if (document.readyState === "loading") {
  // Loading hasn't finished yet
  Avis.addEventListener('DOMContentLoaded', voirAvis);
} else {
  // `DOMContentLoaded` has already fired
  voirAvis();
}


async function voirAvis() {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
  };

  try {
      const response = await fetch("http://127.0.0.1:8000/api/avis/get", requestOptions);
      if (!response.ok) {
          throw new Error('Failed to fetch avis');
      }
      const result = await response.json();

      let content = '';
      result.forEach(item => {
          // Déterminer le texte et la classe du bouton en fonction de is_visible
          const buttonText = item.isVisible ? 'Cacher' : 'Afficher';
          const buttonClass = item.isVisible ? 'btn btn-danger toggle-avis-button' : 'btn btn-success toggle-avis-button';

          content += `
          <ol class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-start text-dark">
                  <div class="ms-2 me-auto">
                      <div class="fw-bold">${item.pseudo}</div>
                      ${item.commentaire}
                  </div>
                  <button class="${buttonClass}" data-avis-id="${item.id}" data-avis-visible="${item.isVisible}">
                      ${buttonText}
                  </button>
              </li>
          </ol>`;
      });

      Avis.innerHTML = content;

      // Écouter les clics sur les boutons de toggle
      const toggleButtons = document.querySelectorAll('.toggle-avis-button');
      toggleButtons.forEach(button => {
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
                  if (!response.ok) {
                      throw new Error(`Failed to toggle visibility for avis ${avisId}`);
                  }

                  // Mettre à jour l'attribut data-avis-visible du bouton pour refléter la nouvelle valeur
                  button.setAttribute('data-avis-visible', newValue);
                  button.textContent = newValue ? 'Cacher' : 'Afficher';
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
    mode: "cors",
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

  // Ne fait rien si aucun prénom n'est sélectionné
  if (!prenomFilter) {
    document.getElementById("Animal").innerHTML = '';
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");

  try {
    // Utilisez l'API appropriée pour récupérer les détails des animaux
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
    content += `
      <div class="d-flex justify-content">
        <table class="table container">
          <tbody>
            <tr>
              <th scope="row" class="text-dark">RACE</th>
              <td class="text-dark">${item.Race.label}</td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Habitats</th>
              <td class="text-dark">${item.Habitat.nom}</td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">PRENOM</th>
              <td class="text-dark">${item.prenom}</td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">ETAT de l'animal</th>
              <td class="text-dark">${item.etat}</td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">La nourriture proposée</th>
              <td class="text-dark">${item.Nourriture.nourriture}</td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Quantité du dernier repas</th>
              <td class="text-dark">${item.Nourriture.grammage}</td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Dernier passage</th>
              <td class="text-dark">${item.Nourriture.date}</td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Etat de l'animal</th>
              <td class="text-dark">${item.detail}</td>
            </tr>
          </tbody>
        </table>
      </div>`;
  });

  document.getElementById("Animal").innerHTML = content;
}

function updatePrenomFilter(items) {
  const prenomFilter = document.getElementById("prenomFilter");
  const prénoms = [...new Set(items.map(item => item.prenom))];

  prenomFilter.innerHTML = '<option value="">Sélectionnez un prénom</option>';
  prénoms.forEach(prenom => {
    const option = document.createElement("option");
    option.value = prenom;
    option.textContent = prenom;
    prenomFilter.appendChild(option);
  });
}

async function fetchAndPopulatePrenomFilter() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");

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
