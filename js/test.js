if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', fetchAndPopulateFilters);
} else {
    // `DOMContentLoaded` has already fired
    fetchAndPopulateFilters();
}

async function fetchAndPopulateFilters() {
    await fetchAndPopulateHabitatFilter();
    await fetchAndPopulateRaceFilter();
}

// Fonction pour charger les habitats
async function fetchAndPopulateHabitatFilter() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/habitat/get');
        if (response.ok) {
            const habitats = await response.json();
            updateHabitatFilter(habitats);
        } else {
            throw new Error("Impossible de récupérer les habitats");
        }
    } catch (error) {
        console.error('Erreur lors du chargement des habitats:', error);
        displayMessage('Erreur lors du chargement des habitats', 'error');
    }
}

// Fonction pour mettre à jour le select avec les habitats
function updateHabitatFilter(habitats) {
    const habitatSelect = document.getElementById("habitatSelect");
    habitatSelect.innerHTML = '<option value="">Sélectionnez un habitat</option>';

    habitats.forEach(habitat => {
        const option = document.createElement("option");
        option.value = habitat.id;
        option.textContent = habitat.nom;
        habitatSelect.appendChild(option);
    });
}

// Fonction pour charger les races
async function fetchAndPopulateRaceFilter() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/race/get');
        if (response.ok) {
            const races = await response.json();
            updateRaceFilter(races);
        } else {
            throw new Error("Impossible de récupérer les races");
        }
    } catch (error) {
        console.error('Erreur lors du chargement des races:', error);
        displayMessage('Erreur lors du chargement des races', 'error');
    }
}

// Fonction pour mettre à jour le select avec les races
function updateRaceFilter(races) {
    const raceSelect = document.getElementById("raceSelect");
    raceSelect.innerHTML = '<option value="">Sélectionnez une race</option>';

    races.forEach(race => {
        const option = document.createElement("option");
        option.value = race.id;
        option.textContent = race.label;
        raceSelect.appendChild(option);
    });
}

// Fonction pour afficher les messages
function displayMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = type; // type should be 'success' or 'error'
}

// Event listener pour le formulaire
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('createAnimalForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const imageFile = formData.get('image_data');

        const reader = new FileReader();
        reader.onloadend = async function() {
            const data = {
                prenom: formData.get('prenom'),
                etat: formData.get('etat'),
                nourriture: formData.get('nourriture'),
                grammage: formData.get('grammage'),
                habitat_id: parseInt(formData.get('habitat_id'), 10),
                race_id: parseInt(formData.get('race_id'), 10),

                image_data: reader.result.split(',')[1] // Encodage base64
            };

            const raceId = formData.get('race_id');
            const newRace = formData.get('newRace').trim();

            if (newRace) {
                try {
                    const raceResponse = await fetch('http://127.0.0.1:8000/api/race/post', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ nom: newRace })
                    });

                    if (raceResponse.ok) {
                        const newRaceData = await raceResponse.json();
                        data.race_id = newRaceData.id;
                    } else {
                        throw new Error('Erreur lors de la création de la race');
                    }
                } catch (error) {
                    console.error('Erreur lors de la création de la race:', error);
                    displayMessage('Erreur lors de la création de la race', 'error');
                    return;
                }
            } else if (raceId) {
                data.race_id = parseInt(raceId, 10);
            } else {
                displayMessage('Veuillez sélectionner une race ou en créer une nouvelle', 'error');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/api/animal/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    displayMessage('Animal créé avec succès!', 'success');
                    document.getElementById('createAnimalForm').reset();
                } else {
                    displayMessage('Erreur lors de la création de l\'animal', 'error');
                }
            } catch (error) {
                console.error('Erreur lors de la soumission du formulaire:', error);
                displayMessage('Erreur lors de la création de l\'animal', 'error');
            }
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
    });
});
