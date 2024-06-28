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
              <td class="text-dark">${item.Race?.label || 'N/A'}</td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Habitats</th>
              <td class="text-dark">${item.Habitat?.nom || 'N/A'}</td>
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
              <td class="text-dark">${item.Nourriture?.nourriture || 'N/A'}</td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Quantité du dernier repas</th>
              <td class="text-dark">${item.Nourriture?.grammage || 'N/A'}</td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Dernier passage</th>
              <td class="text-dark">${item.Nourriture?.date || 'N/A'}</td>
            </tr>
            <tr>
              <th scope="row" class="text-dark">Etat de l'animal</th>
              <td class="text-dark">${item.detail || 'N/A'}</td>
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



const Rapport1 = document.getElementById("rapportVeterinaire1");
const Rapport2 = document.getElementById("rapportVeterinaire2");
const Rapport3 = document.getElementById("rapportVeterinaire3");

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  Rapport1.addEventListener('DOMContentLoaded', VoirRapport);
  Rapport2.addEventListener('DOMContentLoaded', VoirRapport);
  Rapport3.addEventListener('DOMContentLoaded', VoirRapport);


} else {
  // `DOMContentLoaded` has already fired
  VoirRapport();
}



async function VoirRapport(){
const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        mode:"cors",
};

await fetch("http://127.0.0.1:8000/api/rapportveterinaire/get", requestOptions)
.then((response) => {
  if  (response.ok === true){
    return response.json()
  } else
  {
    console.log("Impossible de récupérer les informations utilisateur");
  }
})

      .then((item)=> {
          let content1 = 
            `     <p> le${item[0].date}</p>
                  <p>${item[0].detail}</p> `
           {

          let content2 =    
            `     <p> le${item[1].date}</p>
                  <p>${item[1].detail}</p> `
            {
              let content3 =    
            `     <p>le ${item[2].date}</p>
                  <p>${item[2].detail}</p> `

          Rapport1.innerHTML = content1;
          Rapport2.innerHTML = content2;
          Rapport3.innerHTML = content3;
}}})
        .catch((error) => 
          console.error(error));
}
