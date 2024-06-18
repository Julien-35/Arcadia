const Test = document.getElementById("service");

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    Service.addEventListener('DOMContentLoaded', voirService);
  } else {
    // `DOMContentLoaded` has already fired
    voirService();
  }


// Code METHOD GET 

const myHeaders = new Headers();
myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "nom": "Je suis le nom",
  "commentaire": "Je suis modification"
});

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://127.0.0.1:8000/api/service/get", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

  // Code method PUT

  const myHeaderss = new Headers();
myHeaders.append("X-AUTH-TOKEN", "4d07cfe5e600bc0b9d978d209bb42ab8c05b9fc5");
myHeaders.append("Content-Type", "application/json");

const raws = JSON.stringify({
  "nom": "Je suis le nom",
  "commentaire": "Je suis modification"
});

const requestOptionss = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://127.0.0.1:8000/api/service/2", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));