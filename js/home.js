
const FormAvis = document.getElementById("FormulaireAvis");
const BtnAvis = document.getElementById("boutonAddAvis");

BtnAvis.addEventListener("click",validAvis);


function validAvis () {

  let dataForm = new FormData (FormAvis);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "pseudo": dataForm.get ("pseudo"),
    "commentaire": dataForm.get ("commentaire"),
    "is_visible": true
  });
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("http://127.0.0.1:8000/api/avis/post", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}