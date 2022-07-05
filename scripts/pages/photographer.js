import MediaFactory from "../factories/mediaFactory.js";

// Gestion du clic sur la flèche pour étendre/réduire la liste de filtres
document.querySelector("#arrow-down").addEventListener("click", displayFilters);
document.querySelector("#arrow-up").addEventListener("click", displayFilters);

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
    document.querySelector("#sortDate").classList.toggle('visibleButton');
    document.querySelector("#sortDate").classList.toggle('hidden');
    document.querySelector("#sortTitle").classList.toggle('visibleButton');
    document.querySelector("#sortTitle").classList.toggle('hidden');
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
function displayMedia(medias, firstName){

    const divMedias = document.getElementById("divMedias");
    let articlesList = "";

    // Boucle de création des cards
    for (const mediaItem of medias) {
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
    divContent.innerHTML = `
                            <div id="divTotalLikes">
                                <div>${likesCount}</div>
                                <i class="fa-solid fa-heart"></i>
                            </div> 
                            <div>${price}€ / jour</div>
                            `;
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

    displayHeader(photographData, params.get('id'));
    displayMedia(photographerMedias, firstName);
    displayLikesPrice(photographerMedias, price, params.get('id'));
}

initPage();