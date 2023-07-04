
fetch ('http://localhost:5678/api/works')
    .then (data => data.json())
    .then(jsonListWorks => {
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

//reset gallery by click on all
    const noFilter = document.querySelector("#all");
    noFilter.addEventListener("click", function (){ 
        document.querySelector(".gallery").innerHTML = "";     
        generateWorks(jsonListWorks);
    });

//Function that generate works filtered by categoryId
const filterWorks = (categoryId) => {
    const filteredWorks = jsonListWorks.filter(jsonListWork => jsonListWork.categoryId === categoryId);
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
};
//call filterworks with different required categoryId 
    const filterItemsButton = document.querySelector("#items");
    filterItemsButton.addEventListener("click", function (){      
        filterWorks(1);
    });

    const filterAppartButton = document.querySelector("#appartements");
    filterAppartButton.addEventListener("click", function (){       
        filterWorks(2);
    });

    const filterHotelsButton = document.querySelector("#hotelsRestaurants");
    filterHotelsButton.addEventListener("click", function (){      
        filterWorks(3);
    });

});

