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
      `<ol class="list-group ">
      <li class="list-group-item pb-5 border-black rounded">
        <div class="text-dark">
          <h5>${item.pseudo}</h5>
          <div>${item.commentaire}</div>
        </div>
      </li>
           <div class="p-2"></div>
    </ol> `
      // `<select class="form-select" multiple aria-label="multiple select example">
      // <option>${item.pseudo}</option>
      // <option>${item.commentaire}</option>
      // </select>`
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