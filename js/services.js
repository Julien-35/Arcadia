// const Service = document.getElementById("service");

// if (document.readyState === "loading") {
//     // Loading hasn't finished yet
//     Service.addEventListener('DOMContentLoaded', voirService);
//   } else {
//     // `DOMContentLoaded` has already fired
//     voirService();
//   }

// async function voirService(){

//     const myHeaders = new Headers();
//     myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");

//     const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//         mode:"cors",

//     };

//   await  fetch("http://127.0.0.1:8000/api/service/get", requestOptions)
//   .then((response) => {
//     if  (response.ok === true){
//       return response.json()
//     } else
//     {
//       console.log("Impossible de récupérer les informations utilisateur");
//     }
// })

//         .then((result)=> {
//             let content = '';
//             result.forEach(item => {
//               content += 
//               ` <div class=" row row-cols-1 row-cols-lg-2 mt-5">
//               <div class="col "> 
//                     <h2 class="mb-4 col">${item.nom}</h2>    
//                   </div>  
//                 <div class="col"><p>${item.description}</p>
//                 </div>  
//             </div> 
//             </div>  `
// });
            
//             Service.innerHTML = content;
//           })      
          
//           .catch((error) => 
//             console.error(error));
// }


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
              ` <div>
              <div > 
                    <h2 class="mb-4 col">${item[0].nom}</h2>    
                  </div>  
                <div ><p>${item[0].description}</p>
                </div>  
            </div> 
            </div>  
           `
             {

            let content2 =    
                ` <div>
                <div class="col "> 
                      <h2>${item[1].nom}</h2>    
                    </div>  
                  <div><p>${item[1].description}</p>
                  </div>  
              </div> 
              </div> `
              {
                let content3 =    
                    ` <div>
                    <div> 
                          <h2>${item[2].nom}</h2>    
                        </div>  
                      <div><p>${item[2].description}</p>
                      </div>  
                  </div> 
                  </div> `

            Service.innerHTML = content1;
            Service2.innerHTML = content2;
            Service3.innerHTML = content3;
}}})
          .catch((error) => 
            console.error(error));
}

