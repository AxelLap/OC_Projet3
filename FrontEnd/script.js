
fetch ('http://localhost:5678/api/works')
    .then (data => data.json())
    .then(jsonListWorks => {
        //Boucle for mise dans une fonction pour être apellé plus tard
        function generateWorks(jsonListWorks){
            for (let i = 0; i < jsonListWorks.length; i++){

                let work = jsonListWorks[i];
    
                let sectionGallery = document.querySelector(".gallery");
    
                let workFigure = document.createElement("figure");
    
                let imageFigure = document.createElement("img");
                imageFigure.src = work.imageUrl;
    
                let titleFigure = document.createElement("figurecaption");
                titleFigure.innerText = work.title;
    
                sectionGallery.appendChild(workFigure);
                workFigure.appendChild(imageFigure);
                workFigure.appendChild(titleFigure);
            };
        };    
    generateWorks(jsonListWorks);
//Fonction filterWorks pour créer un tableau de pièces filtrées selon la catégorieId
    const filterWorks = (categoryId) => {
        const filteredWorks = jsonListWorks.filter(jsonListWork => jsonListWork.categoryId === categoryId);
        generateWorks(filteredWorks);
    };
//Appel de la fonction generateWorks au click sur "All" 
    const noFilter = document.querySelector("#all");
    noFilter.addEventListener("click", function (){
        document.querySelector(".gallery").innerHTML = "";
        generateWorks(jsonListWorks);
    });
//Appel de la fonction filterWorks avec argument différent pour chaque bouton
    const filterItemsButton = document.querySelector("#items");
    filterItemsButton.addEventListener("click", function (){
        document.querySelector(".gallery").innerHTML = "";
        filterWorks(1);
    });

    const filterAppartButton = document.querySelector("#appartements");
    filterAppartButton.addEventListener("click", function (){
        document.querySelector(".gallery").innerHTML = "";
        filterWorks(2);
    });

    const filterHotelsButton = document.querySelector("#hotelsRestaurants");
    filterHotelsButton.addEventListener("click", function (){
        document.querySelector(".gallery").innerHTML = "";
        filterWorks(3);
    });

});

