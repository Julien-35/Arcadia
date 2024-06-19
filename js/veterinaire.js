const animal = document.getElementById("Animal");


if (document.readyState === "loading") {
    // Loading hasn't finished yet
    animal.addEventListener('DOMContentLoaded', VoirAnimal);
  } else {
    // `DOMContentLoaded` has already fired
    VoirAnimal();
  }


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
                      <table class="table container ">
                        <tbody>
                          <tr >
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
                            <th scope="row">Date de passage</th>
                            <td>${item.date}</td>
                          </tr>
                          <tr>
                            <th scope="row">Détail de l'état de l'animal </th>
                            <td>${item.RapportVeterinair}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>`
  
    });
    
    animal.innerHTML = content;
  })  .catch((error) => console.error(error));

}
