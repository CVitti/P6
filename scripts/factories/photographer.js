/**
 * Création d'un élément "Photographe"
 * @param {*} data Tableau contenant les data du photographe passé en entrée
 * @returns article = Code HTML de la card du photographe
 */
function photographerFactory(data) {

    // Récupération des variables et leur valeur associée pour ce photographe
    const { name, portrait, city, country, tagline, price, id } = data;

    // Création de la card avec les valeurs récupérées
    const article = `
        <article>
            <a href= "./photographer.html?id=${id}" aria-label="${name}">
                <img src="assets/photographers/${portrait}" alt="" class="profile">
                <h2>${name}</h2>
            </a>
            <p class="location bold">${city}, ${country}</p>
            <p class="bold">${tagline}</p>
            <p>${price}€/jour</p>
        </article>
    `;
    
    return article;
}