fetch('http://localhost:5678/api/works')
    .then(data => data.json())
    .then(jsonListWorks => {
        // Générer les btns filtres
        function generateFiltersBtn() {
            let filters = new Set();
            for (let i = 0; i < jsonListWorks.length; i++) {
                let filter = jsonListWorks[i];
                filters.add(filter.category.name);
            }
            for (let item of filters) {

                let sectionFilters = document.querySelector(".categoryFilters");
                let filterButton = document.createElement("button");
                filterButton.className = "filterBtn";

                filterButton.innerText = item;
                filterButton.className = item;

                sectionFilters.appendChild(filterButton);
            };
        };
        //Générer les travaux
        function generateWorks(jsonListWorks) {
            for (let i = 0; i < jsonListWorks.length; i++) {

                let work = jsonListWorks[i];

                let sectionGalery = document.querySelector(".galery");

                let workFigure = document.createElement("figure");

                let imageFigure = document.createElement("img");
                imageFigure.src = work.imageUrl;

                let titleFigure = document.createElement("figurecaption");
                titleFigure.innerText = work.title;

                sectionGalery.appendChild(workFigure);
                workFigure.appendChild(imageFigure);
                workFigure.appendChild(titleFigure);

            };
        };
        // Appel des fonctions générer filtres et travaux
        generateFiltersBtn(jsonListWorks);
        generateWorks(jsonListWorks);

        //reset galery 
        const noFilter = document.querySelector("#all");
        noFilter.addEventListener("click", function () {
            document.querySelector(".galery").innerHTML = "";
            generateWorks(jsonListWorks);
        });

        //Affichage les travaux filtrer
        const filterWorks = (categoryId) => {
            const filteredWorks = jsonListWorks.filter(jsonListWork => jsonListWork.categoryId === categoryId);
            document.querySelector(".galery").innerHTML = "";
            generateWorks(filteredWorks);
        };
        //Appels filterWorks au click
        const filterItemsButton = document.querySelector(".Objets");
        filterItemsButton.addEventListener("click", function () {
            filterWorks(1);
        });

        const filterAppartButton = document.querySelector(".Appartements");
        filterAppartButton.addEventListener("click", function () {
            filterWorks(2);
        });

        const filterHotelsButton = document.querySelector(".Hotels");
        filterHotelsButton.addEventListener("click", function () {
            filterWorks(3);
        });


    });
//stockage du token dans variable
var isLogged = window.localStorage.getItem("token");
const parsed = JSON.parse(isLogged);
const token = parsed.token;
console.log(token);

// Affichage du mode Admin
if (isLogged !== null) {

    let showToolBar = document.querySelector(".adminToolBar");
    let toolBarContainer = document.createElement("div");
    toolBarContainer.className = "toolBarBox"

    let editModeIconContainer = document.createElement("div");
    let editIcon = document.createElement("img");
    editIcon.src = "./assets/icons/EditIcon.svg";
    let editIconSubtitle = document.createElement("span");
    editIconSubtitle.innerText = "Mode édition";

    let logInTologOut = document.querySelector('#loginLink');
    logInTologOut.innerText = "logout";

    let saveChangesBtn = document.createElement("button");
    saveChangesBtn.innerText = "Publier les changements";

    showToolBar.appendChild(toolBarContainer);
    toolBarContainer.appendChild(editModeIconContainer);
    toolBarContainer.appendChild(saveChangesBtn);

    editModeIconContainer.appendChild(editIcon);
    editModeIconContainer.appendChild(editIconSubtitle);

    let FigureCaption = document.querySelector(".sophieImg");
    let editButtonContainer = document.createElement("div");
    editButtonContainer.className = "editButtonContainer";
    let editButton = document.createElement("img");
    editButton.src = "assets/icons/Group 5.svg";
    editButton.className = "editIconDark";
    FigureCaption.appendChild(editButtonContainer);
    editButtonContainer.appendChild(editButton);

    let editButton2 = document.querySelector(".galeryTitle");
    let modalLinkContainer = document.createElement("div");
    modalLinkContainer.className = "modalLinkCont";
    let editIcon2 = document.createElement("img");
    editIcon2.src = "./assets/icons/editIconBlack.svg";
    let openModalLink = document.createElement("button");
    openModalLink.innerText = "Modifier";
    openModalLink.className = "openModalWindow";

    editButton2.appendChild(modalLinkContainer);
    modalLinkContainer.appendChild(editIcon2);
    modalLinkContainer.appendChild(openModalLink);

    let hideFilters = document.querySelector(".categoryFilters")
    hideFilters.style.display = "none";



} else {
    //window.location.href="login.html";
};
// gestion du logOut
let adminlogOut = document.querySelector('#loginLink');
adminlogOut.addEventListener("click", function () {
    if (adminlogOut.textContent === "logout" && isLogged !== null) {

        let hideToolBar = document.querySelector(".adminToolBar");
        hideToolBar.innerHTML = "";

        let hideEditButton = document.querySelector(".editButtonContainer");
        hideEditButton.innerHTML = "";

        let hideModalLink = document.querySelector(".modalLinkCont");
        hideModalLink.innerHTML = "";


        adminlogOut.innerText = "login";

        localStorage.clear();

        let showFilters = document.querySelector(".categoryFilters");
        showFilters.style.display = "flex";

    } else {
        window.location.href = "login.html";
        console.log("if nok")
    }
});

let sectionGalery = document.querySelector(".modalGalery");
//Gestion de la modale
fetch('http://localhost:5678/api/works')
    .then(data => data.json())
    .then(jsonListModalWorks => {

        function modalWorks(jsonListModalWorks) {
            for (let i = 0; i < jsonListModalWorks.length; i++) {

                let work = jsonListModalWorks[i];

                let imgContainer = document.createElement("div");
                imgContainer.className = "imgContainer";

                let logosContainer = document.createElement("div");
                logosContainer.className = "logosContainer";

                let moveLogo = document.createElement("img")
                moveLogo.src = "./assets/icons/move.svg";

                let trashLogo = document.createElement("img")
                trashLogo.src = "./assets/icons/trash.svg";
                trashLogo.className = "deleteWorkBtn";
                trashLogo.id = work.id;


                let imageFigure = document.createElement("img");
                imageFigure.src = work.imageUrl;
                imageFigure.className = "modaleImg";

                let titleFigure = document.createElement("p");
                titleFigure.innerText = "éditer";

                sectionGalery.appendChild(imgContainer);
                imgContainer.appendChild(imageFigure);
                imgContainer.appendChild(titleFigure);
                imgContainer.appendChild(logosContainer);
                logosContainer.appendChild(moveLogo);
                logosContainer.appendChild(trashLogo);

            }
        };

        //Appel de la fonction

        modalWorks(jsonListModalWorks);
        //Fonction apparition de la modale
        let modal = null;

        const openModal = function (e) {
            e.preventDefault();
            const target = document.querySelector("#modal")
            target.style.display = "flex";
            modal = target
            modal.addEventListener("click", closeModal);
            modal.querySelector(".closeButton").addEventListener("click", closeModal);
            modal.querySelector(".modalContent").addEventListener("click", stopPropagation);
        }
        //Fonction disparition de la modale      
        const closeModal = function (e) {
            if (modal === null) return
            e.preventDefault();
            modal.style.display = "none";
            modal.removeEventListener("click", closeModal)
            modal.querySelector(".closeButton").removeEventListenerEventListener("click", closeModal);
            modal.querySelector(".modalContent").removeEventListener("click", stopPropagation);
            modal === null;
        }
        //Empeche la fonction close du bouton X de se propafer a toute la modale
        const stopPropagation = function (e) {
            e.stopPropagation();
        }
        //Evenement apparition modale
        let openModalLink = document.querySelector(".openModalWindow");
        openModalLink.addEventListener("click", openModal);

        let workToDelete = sectionGalery.querySelectorAll(".deleteWorkBtn");

        workToDelete.forEach((work) => {
            work.addEventListener('click', function (e) {
                e.preventDefault();
                let workId = work.id;
                fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(function(response){
                    if(response.ok) {
                        modalWorks();
                        generateWorks();
                    }else {
                        console.error('Element non supprimé')
                    }
                })
            })
        });
    });

//Gestion de la suppression des travaux

