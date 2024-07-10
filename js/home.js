
const Service = document.getElementById("service");
const Service2 = document.getElementById("service2");
const Service3 = document.getElementById("service3");

const avis = document.getElementById("VoirAvis");



if (document.readyState === "loading") {
  // Loading hasn't finished yet
  avis.addEventListener('DOMContentLoaded', VoirAvis);
} else {
  VoirAvis();
}


if (document.readyState === "loading") {
    // Loading hasn't finished yet
    Service.addEventListener('DOMContentLoaded', voirService);
    Service2.addEventListener('DOMContentLoaded', voirService);
    Service3.addEventListener('DOMContentLoaded', voirService);


  } else {
    // `DOMContentLoaded` has already fired
    voirService();
  }

async function voirService(){

    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        mode:"cors",

    };

  await  fetch("http://127.0.0.1:8000/api/service/get", requestOptions)
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
              ` <p>- ${item[0].nom}</p>  `
             {

            let content2 =    
            ` <p>- ${item[1].nom}</p>  `

              {
                let content3 =    
                ` <p>- ${item[2].nom}</p>  `


            Service.innerHTML = content1;
            Service2.innerHTML = content2;
            Service3.innerHTML = content3;
}}})
          .catch((error) => 
            console.error(error));
}

async function VoirAvis() {
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
          if (item.isVisible === true) {
              content += `
              <ol class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-start text-dark">
                      <div class="ms-2 me-auto">
                          <div class="fw-bold">${item.pseudo}</div>
                          ${item.commentaire}
                      </div>
                  </li>
              </ol>`;
          }
      });

      avis.innerHTML = content;
  } catch (error) {
      console.error('Error:', error);
      console.log("Impossible de récupérer les informations d'avis");
  }
}


document.getElementById('avisForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const pseudo = document.getElementById('pseudo').value;
  const commentaire = document.getElementById('commentaire').value;

  const avisData = {
      pseudo: pseudo,
      commentaire: commentaire,
      isVisible: false  // Par défaut, l'avis n'est pas visible jusqu'à validation
  };

  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(avisData),
      redirect: "follow",
  };

  try {
      const response = await fetch("http://127.0.0.1:8000/api/avis/post", requestOptions);
      if (!response.ok) {
          throw new Error('Failed to send avis');
      }

      const myModal = new bootstrap.Modal(document.getElementById('MessageAvis'));
      myModal.show();

  } catch (error) {
      console.error('Error:', error);
      alert("Impossible d'envoyer l'avis. Veuillez réessayer plus tard.");
  }
});