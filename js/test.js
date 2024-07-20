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