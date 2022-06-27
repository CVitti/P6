/**
 * Création d'un élément "Photographe"
 * @param {*} data Tableau contenant la liste des photographes et leurs datas
 * @returns name = Nom du photographe / picture = chemin de la photo de profil du photographe / getUserCardDOM = Code HTML de la card du photographe
 */
function photographerFactory(data) {
    // Vérification des données recues en entrée
    // console.log("photographerFactory :");
    // console.log(data);

    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // Conteneur des datas du photographe
        const article = document.createElement('article');

        // Image de profil du photographe
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");

        // Lien de navigation vers la page du photographe
        const link = document.createElement('a');
        link.setAttribute("href", `./photographer.html?id=${id}`);
        link.setAttribute("aria-label", `${name}`);

        // Nom du photographe
        const h2 = document.createElement('h2');
        h2.textContent = name;

        // Emplacement du photographe
        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.classList.add("location");
        location.classList.add("bold");

        // Tagline du photographe
        const taglineText = document.createElement('p');
        taglineText.textContent = `${tagline}`;
        taglineText.classList.add("bold");

        // Prix du photographe
        const priceText = document.createElement('p');
        priceText.textContent = `${price}€/jour`;

        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineText);
        article.appendChild(priceText);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}