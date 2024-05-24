let togg1 = document.getElementById("togg1");
let togg2 = document.getElementById("togg2");
let togg3 =document.getElementById ("togg3");
let d1 = document.getElementById("d1");
let d2 = document.getElementById("d2");
let d3 = document.getElementById("d3");


togg1.addEventListener("click", () => {
  if(getComputedStyle(d1).display != "none"){
    d1.style.display = "none";
  } else {
    d1.style.display = "block";
  }
})

function toggMarais(){
  if(getComputedStyle(d2).display != "none"){
    d2.style.display = "none";
  } else {
    d2.style.display = "block";
  }
};
togg2.onclick = toggMarais;

function toggJungle(){
  if(getComputedStyle(d3).display != "none"){
    d3.style.display = "none";
  } else {
    d3.style.display = "block";
  }
};
togg3.onclick = toggJungle;




/*
let togg1 = document.getElementById("togg1");
let d1 = document.getElementById("d1");

let togg2 = document.getElementById("togg2");
let d2 = document.getElementById("d2");

let togg3 = document.getElementById("togg3");
let d3 = document.getElementById("d3");

// Affichage du texte savane 
togg1.addEventListener("click", () => {
  if(getComputedStyle(d1).display != "none"){
    d1.style.display = "none";
  } else {
    d1.style.display = "block";
  }
})

// Affichage du texte marais 
togg2.addEventListener("click", () => {
  if(getComputedStyle(d2).display != "none"){
    d2.style.display = "none";
  } else {
    d2.style.display = "block";
  }
})

// Affichage du texte jungle 
togg3.addEventListener("click", () => {
  if(getComputedStyle(d3).display != "none"){
    d3.style.display = "none";
  } else {
    d3.style.display = "block";
  }
})

*/