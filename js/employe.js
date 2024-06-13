const Avis = document.getElementById("avis");

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  Avis.addEventListener('DOMContentLoaded', voirAvis);
} else {
  // `DOMContentLoaded` has already fired
  voirAvis();
}

async function voirAvis(){

const myHeaders = new Headers();
myHeaders.set("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
  mode:"cors",
};

await fetch("http://127.0.0.1:8000/api/avis/get", requestOptions) 
.then((response) => {
    console.log("response ", response)
  if  (response.ok === true){
    return response.json()
  } else
  {
    console.log("Impossible de récupérer les informations utilisateur");
  }
})
.then((result)=> console.log(result))
.catch((error) =>  
console.log(error));
}  