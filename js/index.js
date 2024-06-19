const SeeDates = document.getElementById("date");



if (document.readyState === "loading") {
  VoirDate();
}
async function VoirDate(){

    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode:"cors",

    };
    
   await fetch("http://127.0.0.1:8000/api/horaire/get", requestOptions)
   .then((response) => {
    if  (response.ok === true){
      return response.json()
    } else
  {
    console.log("Impossible de récupérer les informations horaires");
  }
})
   .then((result)=> {
  
        let content = '';
        result.forEach(item => {
          content += 
          `
          <h3 class="fw-bold fs-4">TITRE</h3>
          <p class="fw-normal fs-4 pt-3">${item.description}</p>
            `
        });
        
        SeeDates.innerHTML = content;
      })
      .catch((error) =>  
      console.log(error));
      }
      