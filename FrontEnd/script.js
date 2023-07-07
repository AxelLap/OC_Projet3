fetch ('http://localhost:5678/api/works')
    .then (data => data.json())
    .then(jsonListWorks => {
        function generateFiltersBtn(){
            let filters = new Set();
            for (let i = 0; i < jsonListWorks.length; i++){
                let filter = jsonListWorks[i];
                filters.add(filter.category.name); 
            }
            for(let item of filters){
            let sectionFilters = document.querySelector(".categoryFilters");
            let filterButton = document.createElement("button");

            filterButton.innerText = item;
            filterButton.className = item;

            sectionFilters.appendChild(filterButton);
            };   
        };

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
    generateFiltersBtn(jsonListWorks);
    generateWorks(jsonListWorks);

//reset gallery 
    const noFilter = document.querySelector("#all");
    noFilter.addEventListener("click", function (){ 
        document.querySelector(".gallery").innerHTML = "";     
        generateWorks(jsonListWorks);
    });

//generate works filtered by categoryId
const filterWorks = (categoryId) => {
    const filteredWorks = jsonListWorks.filter(jsonListWork => jsonListWork.categoryId === categoryId);
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
};
//call filterworks
    const filterItemsButton = document.querySelector(".Objets");
    filterItemsButton.addEventListener("click", function (){      
        filterWorks(1);
    });

    const filterAppartButton = document.querySelector(".Appartements");
    filterAppartButton.addEventListener("click", function (){       
        filterWorks(2);
    });

    const filterHotelsButton = document.querySelector(".Hotels");
    filterHotelsButton.addEventListener("click", function (){      
        filterWorks(3);
    });

});

    var isLogged = window.localStorage.getItem("token");

    if(isLogged !== null){
    
        let showToolBar = document.querySelector(".adminToolBar"); 
        let toolBarContainer = document.createElement("div");
        toolBarContainer.className="toolBarBox"

        let editModeIconContainer = document.createElement("div");

        let editIcon = document.createElement("img");
        editIcon.src = "./assets/icons/EditIcon.svg";

        let editIconSubtitle = document.createElement("span");
        editIconSubtitle.innerText = "Mode édition";

        let saveChangesBtn = document.createElement("button");
        saveChangesBtn.innerText = "Publier les changements";

        showToolBar.appendChild(toolBarContainer);
        toolBarContainer.appendChild(editModeIconContainer);
        toolBarContainer.appendChild(saveChangesBtn);

        editModeIconContainer.appendChild(editIcon);
        editModeIconContainer.appendChild(editIconSubtitle);
    
        let FigureCaption = document.querySelector(".sophieImg");
        let editButton = document.createElement("img");
        editButton.src = "assets/icons/Group 5.svg";
        editButton.className= "editIconDark";
        FigureCaption.appendChild(editButton);
    
        let editButton2 = document.querySelector(".galeryTitle");
        let modalLinkContainer = document.createElement("div");
        let editIcon2 = document.createElement("img");
        editIcon2.src = "./assets/icons/editIconBlack.svg";
        let openModalLink = document.createElement("a");
        openModalLink.innerText = "Modifier";
        editButton2.appendChild(modalLinkContainer);
        modalLinkContainer.appendChild(editIcon2);
        modalLinkContainer.appendChild(openModalLink);
    
    
    }else{
        //window.location.href="login.html";
    };






