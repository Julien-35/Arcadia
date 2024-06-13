alert("Coucou")

let monImage = getImage ("/images/visiteGuide.jpg", "titre" , "description");

function getService (urlImage,titre, description){
         return         ` <div class="action-service-btn">
                <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditionService" data-show="connected"><i class="bi bi-pencil-square" ></i></button>
                    <h2 class="mb-4">/h2>    
                        <button type="button" claRESTAURATIONS<ss="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#DeleteService" data-show="connected"><i class="bi bi-trash3"></i></button></div>  
                     <H1 class="text-warning">${titre}</H1>
                     <p>${description}</p>

            </div>  
            <div > <img class="col w-100 h-100 rounded" src="${urlImage}" alt=""></div> `
}

