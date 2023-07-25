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
                filterButton.id = item;

                sectionFilters.appendChild(filterButton);
            };
        };

        //Générer les travaux dans la galerie
        function generateWorks(jsonListWorks) {
            for (let i = 0; i < jsonListWorks.length; i++) {

                let work = jsonListWorks[i];

                let galery = document.querySelector(".galery");

                let workFigure = document.createElement("figure");
                workFigure.className = "galeryFigure";
                workFigure.id = `id${work.id}`;

                let imageFigure = document.createElement("img");
                imageFigure.src = work.imageUrl;


                let titleFigure = document.createElement("figurecaption");
                titleFigure.innerText = work.title;

                galery.appendChild(workFigure);
                workFigure.appendChild(imageFigure);
                workFigure.appendChild(titleFigure)
            };
        };

        // Générer filtres et travaux
        generateFiltersBtn(jsonListWorks);
        generateWorks(jsonListWorks);

        //filtrer les travaux
        const filtersButtons = document.getElementsByClassName("filterBtn");
        for (let filterButton of filtersButtons) {
            filterButton.addEventListener("click", function (e) {
                let cat = e.target.id;
                if (cat !== "all") {
                    const filteredWorks = jsonListWorks.filter(jsonListWork => jsonListWork.category.name === cat);
                    document.querySelector(".galery").innerHTML = "";
                    generateWorks(filteredWorks);
                } else {
                    document.querySelector(".galery").innerHTML = "";
                    generateWorks(jsonListWorks);
                }
            })
        };
    });
//stockage du token dans variable
let isLogged = window.sessionStorage.getItem("token");
let parsed = JSON.parse(isLogged);
let token = parsed.token;
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

        sessionStorage.clear();

        let showFilters = document.querySelector(".categoryFilters");
        showFilters.style.display = "flex";

    } else {
        window.location.href = "login.html";
    }
});

let sectionGalery = document.querySelector(".modalGalery");

function generateModalWorks(jsonListModalWorks) {
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

//Gestion de la modale
fetch('http://localhost:5678/api/works')
    .then(data => data.json())
    .then(jsonListModalWorks => {
        generateModalWorks(jsonListModalWorks);
    });

let modal = document.querySelector("#modal")
let deleteWorksWindow = document.querySelector("#deleteWorksWindow")
let addWorksWindow = document.querySelector("#createWorkWindow")

const openModal = function () {

    modal.style.display = "flex";
    deleteWorksWindow.style.display = "flex";
    addWorksWindow.style.display = "none";

    modal.addEventListener("click", closeModal);

    let closeBtns = modal.querySelectorAll(".close");
    closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener("click", closeModal);
    });

    modal.querySelector("#deleteWorksWindow").addEventListener("click", stopPropagation);
    modal.querySelector("#createWorkWindow").addEventListener("click", stopPropagation);

    if (deleteWorksWindow.style.display = "flex") {
        deleteWork();
    }
}

let openModalLink = document.querySelector(".openModalWindow");
openModalLink.addEventListener("click", openModal);

function deleteWork() {
    let workToDelete = document.querySelectorAll(".deleteWorkBtn");
    workToDelete.forEach((work) => {
        work.addEventListener('click', function () {
            let workId = work.id;
            console.log(work);
            fetch(`http://localhost:5678/api/works/${workId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(function (response) {
                if (response.ok) {
                    let modalWorktoRemove = work.closest('.imgContainer');
                    modalWorktoRemove.remove();
                    let galery = document.querySelector('.galery');
                    let galeryWorkToRemove = galery.querySelector(`#id${workId}`);
                    galeryWorkToRemove.remove();
                } else {
                    console.error('Element non supprimé')
                }
            })
        })
    });
};
//Supprimer toute la galerie
function deleteAllWorks(){
    let allWorks = document.querySelectorAll(".galeryFigure");
    allWorks.forEach(work => {
        let workId = work.id;
        fetch(`http://localhost:5678/api/works/${workId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(function(response){
                if(response.ok){
                    document.querySelector(".galery").innerHTML = "";
                    document.querySelector(".modalGalery").innerHTML = "";
                }
            })
    });
}

let deleteAllBtn = document.querySelector(".deleteAllWorks");
deleteAllBtn.addEventListener("click", deleteAllWorks);

//Fonction disparition de la modale      
const closeModal = function () {
    if (modal === null) return
    modal.style.display = "none";
    deleteWorksWindow.style.display = "none";
    createWorkWindow.style.display = "none";
    modal.querySelector(".addWorkMessage").innerHTML = "";
}

//Empeche la fonction close du bouton X de se propager a toute la modale
const stopPropagation = function (e) {
    e.stopPropagation();
}

//Apparition de la fenêtre nouveaux travaux
const openAddWorksWindow = function () {
    const target = document.querySelector("#createWorkWindow")
    deleteWorksWindow.style.display = "none";
    target.style.display = "flex";
}

let openAddWorksWindowButton = document.querySelector(".addWorks");
openAddWorksWindowButton.addEventListener("click", openAddWorksWindow);

//Retour a la fenêtre précédente
const returnToModalContent = function () {
    const target = document.querySelector("#createWorkWindow")
    target.style.display = "none";
    deleteWorksWindow.style.display = "flex";
    document.querySelector("#newWorkForm").reset();
    discardPicture();
}

let returnBtn = document.querySelector(".return");
returnBtn.addEventListener("click", returnToModalContent);

//Gestion Modal AddWorks
let image = document.querySelector("#image");
let logo = document.querySelector(".logo");
let addPicBtn = document.querySelector(".addPicBtnStyle");
let requiredFormat = document.querySelector(".requiredFormat");
let input = document.querySelector("#addPicBtn");
let discard = document.querySelector(".discardCross")

// Upload image et prévisualisation
let previewPicture = function (e) {

    let [picture] = e.files
    const requiredTypes = ["image/jpg", "image/png"]
    const maxSizeFile = 4;
    let fileByteSize = picture.size;
    let fileMbSize = ((fileByteSize / 1048576).toFixed(2));

    if (requiredTypes.includes(picture.type) && fileMbSize <= maxSizeFile) {

        let reader = new FileReader();

        reader.onload = function (e) {
            image.src = e.target.result
            image.style.display = "flex";
        }

        reader.readAsDataURL(picture)

        logo.style.display = "none";
        addPicBtn.style.display = "none";
        requiredFormat.style.display = "none";
        if (image.src !== null) {
            discard.style.display = "inline";
        }

    } else {
        let alertContainer = document.querySelector(".alertContainer");
        alertContainer.innerHTML = "";
        let alertText = document.createElement("p");
        alertText.innerText = "Mauvais format ou fichier trop lourd"
        alertText.className = "wrongTypeAlert";
        alertContainer.appendChild(alertText);


    }
}
//Supprimer image selectionnée
let discardPicture = function () {
    image.src = "";
    image.style.display = "none";
    logo.style.display = "flex";
    addPicBtn.style.display = "flex";
    requiredFormat.style.display = "flex";
    discard.style.display = "none";
    selectedPicFile === null;
}

let discardBtn = document.querySelector(".discardCross");
discardBtn.addEventListener("click", discardPicture);

//Création des categories dans le <select>
fetch('http://localhost:5678/api/categories')
    .then(data => data.json())
    .then(jsonListModalCategories => {
        let modalCategory = null;
        for (let i = 0; i < jsonListModalCategories.length; i++) {
            modalCategory = jsonListModalCategories[i];

            let categories = document.querySelector("#categoryList");
            let listCategoryItem = document.createElement("option");

            listCategoryItem.className = "categoryInput";
            listCategoryItem.innerText = modalCategory.name;
            listCategoryItem.value = modalCategory.id;

            categories.appendChild(listCategoryItem);
        }
    });


let categoryInput = document.querySelector("#categoryList");
// sauvegarde de la catégorie selectionnée
categoryInput.addEventListener('change', function () {
    let index = categoryInput.selectedIndex;
    categoryInput.value = index;
});

let validationBtn = document.querySelector(".validateAddBtn")

let imageInput = document.querySelector("#addPicBtn");

let titleInput = document.querySelector("#title");
// Change mise en forme du bouton lorsque formulaire remplis
function enableButton() {
    if (
        imageInput.files.length > 0 &&
        titleInput.value !== "" &&
        categoryInput.value !== ""
    ) {
        validationBtn.classList.add("filledFormBtn");
    } else {
        validationBtn.classList.remove("filledFormBtn");
    }
}

imageInput.addEventListener("input", enableButton);
titleInput.addEventListener("input", enableButton);
categoryInput.addEventListener("input", enableButton);

let validationForm = document.querySelector("#newWorkForm");
//Ajout de nouveaux travaux
validationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let selectedPicFile = document.querySelector("#addPicBtn").files[0];
    let newWorkTitle = document.querySelector("#title").value;
    let selectedCategory = categoryInput.value;

    let newWork = new FormData();

    newWork.append("image", selectedPicFile);
    newWork.append("title", newWorkTitle);
    newWork.append("category", selectedCategory);

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: (newWork),
    })
        .then(function (response) {
            if (response.ok) {

                let imgContainer = document.createElement("div");
                imgContainer.className = "imgContainer";

                let image = document.createElement("img");
                image.className = "modaleImg";
                let uploadedPicture = newWork.get('image');
                let reader = new FileReader();
                reader.readAsDataURL(uploadedPicture);
                reader.onload = function (e) {
                    image.src = e.target.result
                }

                let title = document.createElement("p");
                title.innerText = "éditer";

                let logosContainer = document.createElement("div");
                logosContainer.className = "logosContainer";

                let moveLogo = document.createElement("img")
                moveLogo.src = "./assets/icons/move.svg";

                let trashLogo = document.createElement("img")
                trashLogo.src = "./assets/icons/trash.svg";
                trashLogo.className = "deleteWorkBtn";

                let modalGalery = modal.querySelector(".modalGalery")

                modalGalery.appendChild(imgContainer);
                imgContainer.appendChild(logosContainer);
                imgContainer.appendChild(image);
                imgContainer.appendChild(title);
                logosContainer.appendChild(moveLogo);
                logosContainer.appendChild(trashLogo);

                let galery = document.querySelector(".galery");

                let figureContainer = document.createElement("figure");

                let galeryImage = document.createElement('img');
                let uploadedPictureGalery = newWork.get('image');
                let readerGalery = new FileReader();
                readerGalery.readAsDataURL(uploadedPictureGalery);
                readerGalery.onload = function (e) {
                    galeryImage.src = e.target.result
                }

                let galeryTitle = document.createElement("figurecaption");
                galeryTitle.innerText = newWork.get('title');

                galery.appendChild(figureContainer);
                figureContainer.appendChild(galeryImage);
                figureContainer.appendChild(galeryTitle);

                let addWorkMessage = document.querySelector(".addWorkMessage");
                addWorkMessage.innerHTML = "";
                let addWorkText = document.createElement("p");
                addWorkText.className = "addWorkText";
                addWorkText.innerText = "Nouveau Projet ajouté";
                addWorkMessage.appendChild(addWorkText);

                returnToModalContent()
                
            } else {
                let errorMessage = document.querySelector(".ErrorMessage");
                errorMessage.innerHTML = "";
                let alertText = document.createElement("p");
                alertText.className = "AlertText";
                alertText.innerText = "Formulaire mal renseigné";
                errorMessage.appendChild(alertText);
            }
        })
});