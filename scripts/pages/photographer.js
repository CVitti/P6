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
function displayMedia(medias, idPhotograph){
    // const mediasList = medias.filter(media => media.photographerId == idPhotograph); 
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
    displayMedia(mediaData, params.get('id'));
}

initPage();