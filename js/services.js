

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    services-container.addEventListener('DOMContentLoaded', voirService);


  } else {
    // `DOMContentLoaded` has already fired
    voirService();
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


  async function voirService() {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");

    try {
        const items = await fetchData("https://arcadia-back-26b810fabe9f.herokuapp.com/api/service/get", myHeaders);
        const servicesContainer = document.getElementById("services-container");
        servicesContainer.innerHTML = ''; // Clear existing content

        items.forEach(item => {
            const serviceElement = document.createElement('div');

            serviceElement.innerHTML = `
                    <div class="border border-primary rounded">
                        <h2 class="mb-4 col">${item.nom}</h2>
                        <p>${item.description}</p>
                    </div>
             
            `;

            servicesContainer.appendChild(serviceElement);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}