    /**
     * Lecture du json pour extraction des données
     * @returns photographers = Tableau contenant la liste des photographes et leurs datas
     */
    
    async function getPhotographers() {
        // Tableau où l'on ajoute les photographes extraits du json
        let photographers = [];

        await fetch("./data/photographers.json")
        .then(response => response.json())
        .then(json => {
                const photographersList = json["photographers"];                  
                for (const photographer of photographersList) {
                    photographers.push(photographer);                        
                }
            }
        )
        .catch((err) => {console.log(err)});

        // Vérification du tableau contenant les datas des photographes
        // console.log("Retour de getPhotographers() : ");
        // console.log(photographers);

        // Retour du tableau de tous les photographes extraits du json
        return ({
            photographers: [...photographers]
        })
    }

    /**
     * Création de chaque Card de photographe depuis le tableau récupéré en entrée
     * @param {*} photographers Récupération du tableau contenant tous les photographes et leurs datas
     */

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        // console.log("Entrée de displayData :");
        // console.log(photographers);

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        // Affiche les datas des photographes
        displayData(photographers);
    };
    
    init();
    