

let togg1 = document.getElementById("togg1");
let togg2 = document.getElementById("togg2");
let togg3 = document.getElementById ("togg3");
let d1 = document.getElementById("d1");
let d2 = document.getElementById("d2");
let d3 = document.getElementById("d3");
let d4 = document.getElementById("d4");
let d5 = document.getElementById("d5");
let d6 = document.getElementById("d6");

const animal = document.getElementById("Animal");
const animal2 = document.getElementById("Animal2");



if (document.readyState === "loading") {
    // Loading hasn't finished yet
    animal.addEventListener('DOMContentLoaded', VoirAnimal);
  } else {
    // `DOMContentLoaded` has already fired
    VoirAnimal();
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
                            <td>${item.races}</td>
                          </tr>
                          <tr>
                            <th scope="row">Habitats</th>
                            <td>${item.habitats}</td>
                          </tr>
                          <tr>
                            <th scope="row">PRENOM</th>
                            <td>${item.prenom}</td>
                          </tr>
                          <tr>
                            <th scope="row">ETAT de l'animal</th>
                            <td>${item.etat}</td>
                          </tr>
                          <tr>
                            <th scope="row">La nourriture proposée</th>
                            <td>${item.nourriture}</td>
                          </tr>
                          <tr>
                            <th scope="row">Le grammage de la nourriture</th>
                            <td>${item.quantity}</td>
                          </tr>
                          <tr>
                            <th scope="row">Rapport du vétérinaire</th>
                            <td>${item.RapportVeterinaire}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>`
  
    });
    
    animal.innerHTML = content;
    animal2.innerHTML = content;
  })  .catch((error) => console.error(error));

}
