const Avis = document.getElementById("avis");
const PutFormulaire = document.getElementById("putFormulaire");
const PutEmployeBouton = document.getElementById("PutEmployeBouton");

PutEmployeBouton.addEventListener("click", ModifierService);
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  Avis.addEventListener('DOMContentLoaded', voirAvis);
} else {
  // `DOMContentLoaded` has already fired
  voirAvis();
}

async function voirAvis(){
const myHeaders = new Headers();
myHeaders.set("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
  mode:"cors",
};

await fetch("http://127.0.0.1:8000/api/avis/get", requestOptions) 
.then((response) => {
  if  (response.ok === true){
    return response.json()
  } else
  {
    console.log("Impossible de récupérer les informations utilisateur");
  }
})
.then((result)=> {
  let content = '';
  result.forEach(item => {
    content += 
    `
<ol class="list-group " id="avis">
    <li class="list-group-item d-flex justify-content-between align-items-start text-dark">
      <div class="ms-2 me-auto">
        <div class="fw-bold">${item.pseudo}</div>
        ${item.commentaire}
      </div>
    </li>
  </ol>    `

    // `<select class="form-select" multiple aria-label="multiple select example">
    // <option>${item.pseudo}</option>
    // <option>${item.commentaire}</option>
    // </select>`
  });
  
  Avis.innerHTML = content;
})
.catch((error) =>  
console.log(error));
}


const Service = document.getElementById("service");
const Service2 = document.getElementById("service2");
const Service3 = document.getElementById("service3");


async function ModifierService () {

  let dataForm = new FormData(PutFormulaire);
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
                <div class="col "> 
                      <h2>${item[1].nom}</h2>    
                    </div>  
                  <div><p>${item[1].description}</p>
                  </div>  
              </div> 
              </div> `
              {
                let content3 =    
                    ` <div>
                      <div class="col "> 
                          <h2>${item[2].nom}</h2>    
                        </div>  
                      <div><p>${item[2].description}</p>
                      </div>  
                  </div> 
                  </div> `

            Service.innerHTML = content1;
            Service2.innerHTML = content2;
            Service3.innerHTML = content3;
}}})
          .catch((error) => 
            console.error(error));
}



