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
        <p>${tagline}</p>`;

    divPicture.innerHTML = `<img src="assets/photographers/${portrait}" alt="${name}" class="profile">`;
}

/**
 * Mise en page des medias
 * @param {*} medias Liste des medias extraits du json
 * @param {*} idPhotograph identifiant du photographe sur lequel la page est située
 */
function displayMedia(medias, photographData, idPhotograph){

    const mediasList = medias.filter(media => media.photographerId == idPhotograph);
    // console.log("Liste des medias : ", mediasList); 

    // Récupération du prénom du photographe pour accéder au chemin de ses médias
    const photographer = photographData.filter(photograph => photograph.id == idPhotograph);
    const firstName = photographer[0].name.split(' ')[0];

    const divPicture = document.getElementById("divMedias");
    let mediasCards = "";

    for (const mediaItem of mediasList) {
        // Création de la card
        // let mediaContent = "";

        // // Ajout du média
        // if (mediaItem.image) {
        //     mediaContent += `<img src ="assets/images/${firstName}/${mediaItem.image}" alt="" class="mediaContent">`;
        // }else if (mediaItem.video) {
        //     mediaContent += `<video class="mediaContent"> 
        //                         <source src="assets/images/${firstName}/${mediaItem.video}" type="video/mp4">
        //                     </video>`;
        // }else{
        //     mediaContent += "Format de média incorrect";
        // }
        // // Ajout du nom du média
        // let mediaTitle = `<h2 class="mediaTitle">${mediaItem.title}</h2>`;
        // // Ajout des likes
        // let mediaLikes = `<div class="divLikes">${mediaItem.likes}<i class="fa-solid fa-heart fa-lg"></i></div>`;
        // // Fin de la card
        // let article = `<article class="articleMedia">${mediaContent}${mediaTitle}${mediaLikes}</article>`;
        // mediasCards += article;
        new MediaFactory(mediaItem, firstName);
    }
    // divPicture.innerHTML = mediasCards;
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

    displayHeader(photographData, params.get('id'));
    displayMedia(mediaData, photographData, params.get('id'));
}

initPage();