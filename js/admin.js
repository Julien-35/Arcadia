const PutAdminFormulaire = document.getElementById("putAdminFormulaire");
const PutAdminService = document.getElementById("PutAdminBouton");
const BtnHoraire = document.getElementById("PutHoraireBouton");

const PutHoraire = document.getElementById("formulaireHoraire");

const Service4 = document.getElementById("service4");
const Service5 = document.getElementById("service5");
const Service6 = document.getElementById("service6");


PutAdminService.addEventListener("click",ModifierServices);
BtnHoraire.addEventListener("click",ModifierHoraires);


async function ModifierServices () {

let dataForm = new FormData(PutAdminFormulaire);
        const myHeaders = new Headers();
            myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
            myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({

            "nom": dataForm.get("titre"),
            "description": dataForm.get("commentaire"),
            });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
    await fetch("http://127.0.0.1:8000/api/service/1", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}


if (document.readyState === "loading") {
    // Loading hasn't finished yet
    Service4.addEventListener('DOMContentLoaded', voirService);
    Service5.addEventListener('DOMContentLoaded', voirService);
    Service6.addEventListener('DOMContentLoaded', voirService);


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
              ` <div>
              <div > 
                    <h2 class="mb-4 col">${item[0].nom}</h2>    
                  </div>  
                <div ><p>${item[0].description}</p>
                </div>  
            </div> 
            </div>  
           `
             {

            let content2 =    
                ` <div>
                <div > 
                      <h2>${item[1].nom}</h2>    
                    </div>  
                  <div><p>${item[1].description}</p>
                  </div>  
              </div> 
              </div> `
              {
                let content3 =    
                    ` <div>
                    <div> 
                          <h2>${item[2].nom}</h2>    
                        </div>  
                      <div><p>${item[2].description}</p>
                      </div>  
                  </div> 
                  </div> `

            Service4.innerHTML = content1;
            Service5.innerHTML = content2;
            Service6.innerHTML = content3;
}}})
          .catch((error) => 
            console.error(error));
}

// Voir les horaires :

if (document.readyState === "loading") {
  VoirDate();
}
 function ModifierHoraires(){

  let dataForm = new FormData(PutHoraire);

  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "description": dataForm.get("horaire"),
  });
  
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
   fetch("http://127.0.0.1:8000/api/horaire/2", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
      