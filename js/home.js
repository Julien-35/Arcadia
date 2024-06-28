const FormAvis = document.getElementById("FormulaireAvis");
const VoirAvis = document.getElementById("VoirAvis");
const BtnAvis = document.getElementById("boutonAddAvis");


BtnAvis.addEventListener("click",validAvis);
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  Avis.addEventListener('DOMContentLoaded', voirAvis);
} else {
  // `DOMContentLoaded` has already fired
  voirAvis();
}


async function voirAvis(){
  const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    mode:"cors",
  };

await fetch("http://127.0.0.1:8000/api/avis/get", requestOptions) 
.then(response => response.json())

.then(data => {
  // Filtrer les données pour ne conserver que celles dont une propriété spécifique est égale à true
  let filteredData = data.filter(item => item.isVisible === true);

  let content = '';   
  console.log("test")
  filteredData.forEach(item => {
    content += 
    `
<ol class="list-group " id="VoirAvis">
    <li class="list-group-item d-flex justify-content-between align-items-start text-dark">
      <div class="ms-2 me-auto">
        <div class="fw-bold">${item.pseudo}</div>
        ${item.commentaire}
      </div>
    </li>
  </ol> `
  });

  VoirAvis.innerHTML = content;
})
.catch((error) =>  
console.log(error));
}


async function validAvis () {
  let dataForm = new FormData(FormAvis);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "pseudo": dataForm.get("title"),
    "commentaire": dataForm.get("textCommentaire"),
    "is_visible": true,
  });

  
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  await fetch("http://127.0.0.1:8000/api/avis/post", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


const Service = document.getElementById("service");
const Service2 = document.getElementById("service2");
const Service3 = document.getElementById("service3");

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
              `<p class="text-start"><i class="bi bi-arrow-right-circle-fill"></i>${item[0].nom}</p>`
           {

          let content2 =    
              `<p class="text-start"><i class="bi bi-arrow-right-circle-fill"></i>${item[1].nom}</p>`

            {
              let content3 =    
              `<p class="text-start"><i class="bi bi-arrow-right-circle-fill"></i>${item[2].nom}</p>`

          Service.innerHTML = content1;
          Service2.innerHTML = content2;
          Service3.innerHTML = content3;
}}})
        .catch((error) => 
          console.error(error));
}