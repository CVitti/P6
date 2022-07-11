/**
* Lecture du json pour extraction des données
* @returns photographers = Tableau contenant la liste des photographes et leurs datas
*/

async function getPhotographers() {

    const response = await fetch("./data/photographers.json")
    const data = await response.json();        
    return data.photographers;

}

/**
 * Création de toutes les cards individuellement via la fonction photographerFactory() puis affichage dans la section photographersSection
 * @param {*} photographers Tableau contenant la liste de tous les photographes et leurs datas nominatives
 */

async function displayData(photographers) {

    // Récupération de la section où seront affichées les cards
    const photographersSection = document.querySelector(".photographer_section");

    // photographerArticle = chaine de caractères qui va contenir le code HTML d'une card retourné par la fonction photographerFactory pour chaque appel
    let photographerArticle = "";
    photographers.forEach((photographer) => {
        // Accumulation du code HTML à chaque appel dans la variable
        // @ts-ignore
        photographerArticle += photographerFactory(photographer); 
    });    

    // Affichage de toutes les cards accumulées dans photographerArticle
    photographersSection.innerHTML = photographerArticle;

};

/**
 * Chargement des datas et affichage des cards au chargement de la page
 */
async function init() {

    const photographers = await getPhotographers();
    displayData(photographers);

};
    
init();
    