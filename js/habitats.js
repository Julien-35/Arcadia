let togg1 = document.getElementById("togg1");
let togg2 = document.getElementById("togg2");
let togg3 = document.getElementById ("togg3");
let d1 = document.getElementById("d1");
let d2 = document.getElementById("d2");
let d3 = document.getElementById("d3");
let d4 = document.getElementById("d4");
let d5 = document.getElementById("d5");
let d6 = document.getElementById("d6");


if (document.readyState === "loading") {
    // Loading hasn't finished yet
   
  } else {
    // `DOMContentLoaded` has already fired
     voirHabitat();
  }
  if (document.readyState === "loading") {
    // Loading hasn't finished yet
   
  } else {
    // `DOMContentLoaded` has already fired
      VoirAnimal ();
  }


togg1.addEventListener("click", () => {
  if(getComputedStyle(d1,d2).display != "none"){
    d1.style.display = "none";
    d2.style.display = "none";
  } else {
    d1.style.display = "block";
    d2.style.display = "block";
  }
});


function toggSavane(){
  if(getComputedStyle(d1,d2).display != "none"){
    d1.style.display = "none";
    d2.style.display = "none";
  } else {
    d1.style.display = "block";
    d2.style.display = "none";
  }
};
togg2.onclick = toggSavane;

function toggMarais(){
  if(getComputedStyle(d3,d4).display != "none"){
    d3.style.display = "none";
    d4.style.display = "none";
  } else {
    d3.style.display = "block";
    d4.style.display = "block";
  }
};
togg2.onclick = toggMarais;


function toggJungle(){
  if(getComputedStyle(d5,d6).display != "none"){
    d5.style.display = "none";
    d6.style.display = "none";
  } else {
    d5.style.display = "block";
    d6.style.display = "block";
  }
};
togg3.onclick = toggJungle;


// Fonction pour afficher un animal dans sa div
let animal = document.getElementById("Animal");
let animal2 = document.getElementById("Animal2");


async function VoirAnimal (){
    const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");


    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        mode:"cors",
};

await fetch("http://127.0.0.1:8000/api/animal/get", requestOptions)
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
    
    `<div class="d-flex justify-content pb">
                      <table class="table container">
                        <tbody class="text-start text-dark">
                          <tr>
                            <th scope="row">RACE</th>
                            <td>${item.Race.label}</td>
                          </tr>
                          <tr>
                            <th scope="row">Habitats</th>
                            <td>${item.Habitat.nom}</td>
                          </tr>
                          <tr>
                            <th scope="row">PRENOM</th>
                            <td>${item.prenom}</td>
                          </tr>
                          <tr>
                            <th scope="row">ETAT de l'animal</th>
                            <td>${item.detail}</td>
                          </tr>
                          <tr>
                        </tbody>
                      </table>
                    </div>`
                    {     
                      let content2 =    
    
                      `<div class="d-flex justify-content pb">
                                        <table class="table container">
                                          <tbody class="text-start text-dark">
                                            <tr>
                                              <th scope="row">RACE</th>
                                              <td>${item.Race.label}</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">Habitats</th>
                                              <td>${item.Habitat.nom}</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">PRENOM</th>
                                              <td>${item.prenom}</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">ETAT de l'animal</th>
                                              <td>${item.detail}</td>
                                            </tr>
                                            <tr>
                                          </tbody>
                                        </table>
                                      </div>`

                    
                                      animal.innerHTML = content;
                                      animal2.innerHTML = content2;
                                    }});
    

  })  .catch((error) => console.error(error));

}

const DescritpionHabitat1 = document.getElementById("DescriptionSavane");
const DescritpionHabitat2 = document.getElementById("DescriptionMarais");
const DescritpionHabitat3 = document.getElementById("DescriptionJungle");
const TitreHabitat1 = document.getElementById("TitreSavane");
const TitreHabitat2 = document.getElementById("TitreMarais");
const TitreHabitat3 = document.getElementById("TitreJungle");


async function voirHabitat(){

  const myHeaders = new Headers();
      myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
      myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    mode:"cors",
  };

await fetch("http://127.0.0.1:8000/api/habitat/get", requestOptions)

.then((response) => {
    if  (response.ok === true){
      return response.json()
    } else
  {
    console.log("Impossible de récupérer les informations des habitats");
  }
})
.then((item)=> {
  let content = 
    `
    <p>${item[0].description}</p>`
   {

  let content2 =    
      `
      <p>${item[1].description}</p>`
    {
  let content3 =    
  
      `<p>${item[2].description}</p>`

      {
    let content4 =         
      `<h2>${item[0].nom}</h2>`
       {    
    let content5 =         
      `<h2>${item[1].nom}</h2>`
      {
    let content6 =         
      `<h2>${item[2].nom}</h2>`

DescritpionHabitat1.innerHTML = content;
DescritpionHabitat2.innerHTML = content2;
DescritpionHabitat3.innerHTML = content3;

TitreHabitat1.innerHTML = content4;
TitreHabitat2.innerHTML = content5;
TitreHabitat3.innerHTML = content6;

}}}}}})
.catch((error) =>  
console.log(error));
}
