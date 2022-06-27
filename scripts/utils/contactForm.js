/**
 * Ouverture de la fenêtre modale de Contact
 */
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

/**
 * Fermeture de la fenêtre modale de Contact
 */
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


/**
 * 
 * @param {*} idPhotograph = ID du photographe sélectionné depuis l'accueil
 */
async function loadData(idPhotograph){
    let mediaData = [];
    let photographData = [];

    await fetch("./data/photographers.json")
    .then(response => response.json())
    .then(json => {
            // Récupération de tous les médias
            const mediasList = json["media"];                  
            for (const media of mediasList) {
                // Tri des médias pour ne garder que ceux du photographe en entrée
                if(media.photographerId == idPhotograph){
                    mediaData.push(media);
                }                 
            }
            // Vérification des médias récupérées pour cet id
            // console.log("Medias du photographe : " + idPhotograph);
            // console.log(mediaData);

            const photographList = json["photographers"];                  
            for (const photographer of photographList) {
                // Tri des médias pour ne garder que ceux du photographe en entrée
                if(photographer.id == idPhotograph){
                    photographData.push(photographer);
                }                 
            }

            // Vérification des datas du photographe récupérées pour cet id
            // console.log("Datas du photographe : " + idPhotograph);
            // console.log(photographData);
        }
    )
    .catch((err) => {console.log(err)});
    return ({
        photographData: [...photographData],
        mediaData: [...mediaData]
    })
}

/**
 * Mise en page du header avec l'ajout des datas du photographe et son image de profil
 * @param {*} data = Données concernant le photographe
 */
function displayHeader(data){
    console.log(data);
    const { name, portrait, city, country, tagline, price, id } = data[0];

    const divData = document.getElementById("photograph-data");
    const divPicture = document.getElementById("photograph-picture");

    // Création du H1 contenant le nom du photographe
    const h1 = document.createElement('h1');
    h1.textContent = name;
    h1.classList.add("name");

    // Création du paragraphe contenant l'emplacement
    const pLocation = document.createElement('p');
    pLocation.textContent = `${city}, ${country}`;
    pLocation.classList.add("location");
    pLocation.classList.add("bold");

    // Création du paragraphe contenant l'emplacement
    const pTagline = document.createElement('p');
    pTagline.textContent = tagline;

    // Image de profil du photographe
    const picture = `assets/photographers/${portrait}`;
    const img = document.createElement('img');
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    
    divData.appendChild(h1);
    divData.appendChild(pLocation);
    divData.appendChild(pTagline);
    divPicture.appendChild(img);
}

/**
 * Initialisation de la page via la récupération des datas et ensuite leur traitement
 */

async function initPage(){
    // Récupération de l'ID du photographge via l'URL
    let params = (new URL(document.location)).searchParams;
    // Chargement des données et médias liés à cet id
    const { photographData, mediaData } = await loadData(params.get('id'));
    displayHeader(photographData);
}

initPage();