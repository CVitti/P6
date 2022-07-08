import MediaFactory from "../factories/MediaFactory.js";
import Lightbox from "../utils/Lightbox.js";

/**
 * Gestion de l'affichage des éléments de filtrage des médias
 */
function displayFilters(){

    // Afficher/masquer flèche vers le bas
    document.querySelector("#arrow-up").classList.toggle('visible');
    document.querySelector("#arrow-up").classList.toggle('hidden');

    // Afficher/masquer flèche vers le bas
    document.querySelector("#arrow-down").classList.toggle('visible');
    document.querySelector("#arrow-down").classList.toggle('hidden');

    // Afficher/masquer les boutons de filtre
    document.querySelector("#secondOption").classList.toggle('visible');
    document.querySelector("#secondOption").classList.toggle('hidden');
    document.querySelector("#thirdOption").classList.toggle('visible');
    document.querySelector("#thirdOption").classList.toggle('hidden');
}

/**
 * 
 * @returns Tableau des photographes
 */
async function getPhotographerData(){
    
    const response = await fetch("./data/photographers.json")
    const data = await response.json();
    return data.photographers;
}

/**
 * 
 * @returns Tableau des medias
 */
async function getMediaData(){
    const response = await fetch("./data/photographers.json")
    const data = await response.json(); 
    return data.media;
}

/**
 * 
 * @param {*} data Liste des photographes extraits du json
 * @param {*} idPhotograph identifiant du photographe sur lequel la page est située
 */

function displayHeader(data, idPhotograph){

    const photographer = data.filter(photograph => photograph.id == idPhotograph);
    const { name, portrait, city, country, tagline } = photographer[0];

    const divData = document.getElementById("photograph-data");
    const divPicture = document.getElementById("photograph-picture");

    divData.innerHTML = `
        <h1 class="name">${name}</h1>
        <p class="location bold">${city}, ${country}</p>
        <p class="smallSpacing">${tagline}</p>`;
        
    divPicture.innerHTML = `<img src="assets/photographers/${portrait}" alt="${name}" class="profile">`;
}

/**
 * Mise en page des medias
 * @param {*} medias Liste des medias extraits du json
 * @param {*} firstName Prénom du photographe
 */

function displayMedia(medias, firstName, sortBy){

    const divMedias = document.getElementById("divMedias"); // Récupération de la section où seront affichés les médias
    let articlesList = ""; // Contiendra le code HTML des articles à créer
    let sortedMedias = null; // Contiendra un tableau avec les médias triés
    let temp = null; // Conteneur temporaire pour changer l'ordre des options de tri
    let currentParent = null; // Contiendra l'id de l'élément parent du tri sélectionné pour inverser l'ordre des options

    switch (sortBy) {

        // Tri décroissant sur les likes du média, inverser les opérateurs de comparaison pour passer en tri croissant
        case "Likes":
            sortedMedias = medias.sort(function(a, b) {
                if (a.likes < b.likes) {
                    return 1;
                } else if(a.likes > b.likes){
                    return -1;
                }else{
                    return 0;
                }
            });
            currentParent = document.getElementById("btnSortLikes").parentElement.id;
            break;

        // Tri décroissant sur la date du média
        case "Date":
            sortedMedias = medias.sort(function(a, b) {
                a = new Date(a.date);
                b = new Date(b.date);
                if (a < b) {
                    return 1;
                } else if(a > b){
                    return -1;
                }else{
                    return 0;
                }
            });
            currentParent = document.getElementById("btnSortDate").parentElement.id;
            break;

        // Tri croissant sur le nom du média
        case "Title":
            sortedMedias = medias.sort(function(a, b) {
                if (a.title > b.title) {
                    return 1;
                } else if(a.title < b.title){
                    return -1;
                }else{
                    return 0;
                }
            });
            currentParent = document.getElementById("btnSortTitle").parentElement.id;
            break;
            
        // Tri par défaut positionné sur les likes, tri décroissant
        default:
            sortedMedias = medias.sort(function(a, b) {
                if (a.likes < b.likes) {
                    return 1;
                } else if(a.likes > b.likes){
                    return -1;
                }else{
                    return 0;
                }
            });
            currentParent = document.getElementById("btnSortLikes").parentElement.id;
            break;
    }

    // Réorganisation de la liste de tri
    temp = document.getElementById("firstOption").innerHTML;
    document.getElementById("firstOption").innerHTML = document.getElementById(currentParent).innerHTML;
    document.getElementById(currentParent).innerHTML = temp;

    // Ajout des fonctions déclenchées par le clic sur les boutons du menu de tri.
    document.querySelector("#btnSortLikes").addEventListener("click", () => {
        displayMedia(sortedMedias, firstName, "Likes");
    });
    document.querySelector("#btnSortDate").addEventListener("click", () => {
        displayMedia(sortedMedias, firstName, "Date");
    });
    document.querySelector("#btnSortTitle").addEventListener("click", () => {
        displayMedia(sortedMedias, firstName, "Title");
    });

    
    // Boucle de création des cards
    for (const mediaItem of sortedMedias) {
        let mediaCard = new MediaFactory(mediaItem, firstName);        
        articlesList += mediaCard.article;
    }

    // Injection des cards dans la section appropriée
    divMedias.innerHTML = articlesList;  

    // Ajout d'un évènement de clic sur les coeurs de chaque card pour incrémenter les likes
    let listDivLike = document.querySelectorAll("div.divLikes");
    for (const div of listDivLike) {
        div.addEventListener("click", addLike);
    }

    // Gestion de la lightbox sur le lien de chaque média
    let listMediaLinks = document.querySelectorAll("a.mediaLink");
    let lightbox = new Lightbox(sortedMedias, firstName);
    for (const link of listMediaLinks) {
        link.addEventListener("click", (e) => {
            lightbox.show(e.currentTarget.dataset.id);
        });
    }
}


/**
 * 
 * @param {*} medias Liste des medias liés à ce photographe
 * @param {*} price Tarif journalier du photographe
 * @param {*} id du photographe sélectionné
 */
function displayLikesPrice(medias, price, id){
    const mediasList = medias.filter(media => media.photographerId == id);
    let divContent = document.getElementById("divLikesPrice");
    let likesCount = 0;
    for (const media of mediasList) {
        likesCount += media.likes;
    }
    divContent.innerHTML = `<div id="divTotalLikes">
                                <div>${likesCount}</div>
                                <i class="fa-solid fa-heart"></i>
                            </div> 
                            <div>${price}€ / jour</div>`;
}

/**
 * Incrémentation du nombre de likes lors du clic sur le coeur des cards
 */
function addLike(){
    // Incrémentation des likes de la photo choisie
    let currentLikes = parseInt(this.firstElementChild.innerText);
    this.firstElementChild.innerText = currentLikes + 1;

    // Retrait de l'event pour ajouter un like et attribution de l'event pour retirer le like
    this.removeEventListener("click", addLike);
    this.addEventListener("click", removeLike);

    // Incrémentation du total de likes en bas de page
    let currentTotal = parseInt(document.getElementById("divTotalLikes").firstElementChild.innerText);
    document.getElementById("divTotalLikes").firstElementChild.innerText = currentTotal + 1;
}

/**
 * Décrémentation du nombre de likes lors du clic sur le coeur des cards déjà likées
 */
 function removeLike(){
    // Incrémentation des likes de la photo choisie
    let currentLikes = parseInt(this.firstElementChild.innerText);
    this.firstElementChild.innerText = currentLikes - 1;

    // Retrait de l'event pour retirer un like et attribution de l'event pour ajouter le like
    this.removeEventListener("click", removeLike);
    this.addEventListener("click", addLike);

    // Incrémentation du total de likes en bas de page
    let currentTotal = parseInt(document.getElementById("divTotalLikes").firstElementChild.innerText);
    document.getElementById("divTotalLikes").firstElementChild.innerText = currentTotal - 1;
}


/**
 * Initialisation de la page via la récupération des datas et ensuite leur traitement
 */
async function initPage(){
    // Récupération de l'ID du photographge via l'URL
    let params = (new URL(document.location)).searchParams;

    // Chargement des données et médias liés à cet id
    const photographData = await getPhotographerData();
    const mediaData = await getMediaData();

    // Récupération du prénom et prix du photographe
    const photographer = photographData.filter(photograph => photograph.id == params.get('id'));
    const firstName = photographer[0].name.split(' ')[0];
    const price = photographer[0].price;

    // Filtrage des medias
    const photographerMedias = mediaData.filter(media => media.photographerId == params.get('id'))

    // Appel des fonctions pour afficher les infos du photographe, ses médias ainsi que son total de likes et son tarif journalier 
    displayHeader(photographData, params.get('id'));
    displayMedia(photographerMedias, firstName, null);
    displayLikesPrice(photographerMedias, price, params.get('id'));

    // Gestion du clic sur la flèche pour étendre/réduire la liste de filtres
    document.querySelector("#arrow-down").addEventListener("click", displayFilters);
    document.querySelector("#arrow-up").addEventListener("click", displayFilters);

    // Gestion du clavier lors des interactions avec la flèche pour étendre/réduire la liste de filtres
    document.querySelector("#arrow-down").addEventListener("keyup", (e) =>{
        // Keycode 13 = Entrée
        if (e.keyCode == "13"){
            displayFilters();
        }
    });
    document.querySelector("#arrow-up").addEventListener("keyup", (e) =>{
        // Keycode 13 = Entrée
        if (e.keyCode == "13"){
            displayFilters();
        }
    });
}

initPage();