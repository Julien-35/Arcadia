const SeeDates = document.getElementById("date");

if (document.readyState !== "loading") {
  VoirDate();
}

async function VoirDate() {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
  };

  await fetch("https://arcadia35380-f680d3a74682.herokuapp.com/api/horaires/get", requestOptions)
  .then((response) => {
      if  (response.ok === true){
        return response.json()
      } else {
        console.log("Impossible de récupérer les informations horaires");
      }
   })
  .then((result)=> {
    let content = '';
    result.forEach(item => {
      content += 
      `
      <h3 class="fw-bold fs-4">${item.titre}</h3>
      <p class="fw-normal fs-4">${item.message}</p>
      <p class="fw-normal fs-4" >${item.heureDebut} - ${item.heureFin}</p>
      <p class="fw-normal fs-4" >${item.jour} </p>
      `
    })

   SeeDates.innerHTML = content;
  })
  .catch((error) =>  
    console.log(error)
  );
}
      