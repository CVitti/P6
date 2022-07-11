export default class Lightbox{
    constructor(mediasList, firstname){
        this.currentElement = null;
        this.mediasList = mediasList;
        this.firstname = firstname;
        this.manageEvents();
    }

    // Affichage de la lightbox
    show(id){
        this.currentElement = this.getElementById(id);   
        this.displayMedia();
        document.getElementById("lightbox").focus(); 
    }

    // Affichage du media suivant
    next(){
        let index = this.mediasList.findIndex(media => media.id == this.currentElement.id);
        if (index == this.mediasList.length - 1) {
            this.currentElement = this.mediasList[0];
        } else {
            this.currentElement = this.mediasList[index + 1];
        }
        this.displayMedia();
    }

    // Affichage du media précédent
    previous(){
        let index = this.mediasList.findIndex(media => media.id == this.currentElement.id);
        if (index == 0) {
            this.currentElement = this.mediasList[this.mediasList.length - 1];
        } else {
            this.currentElement = this.mediasList[index - 1];
        }
        this.displayMedia();
    }

    close(){
        // Gestion de l'accessiblité sur la modale et le main, à l'ouverture de la lightbox
        document.getElementById("main").ariaHidden = "false";
        document.getElementById("lightbox").ariaHidden = "true";

        // Disparition de la lightbox
        document.querySelector("#lightbox").classList.remove("displayMedia");

        // Focus remis sur le média que l'on vient de quitter depuis le lightbox
        document.getElementById(this.currentElement.id).focus();
    }

    displayMedia(){
        let media = "";
        if(this.currentElement.image){
            media = `<img src="assets/images/${this.firstname}/${this.currentElement.image}" alt="${this.currentElement.title}" class="lightboxMedia">
                    <p class="mediaTitle spacing">${this.currentElement.title}</p>`;
        }else if(this.currentElement.video){
            media = `<video controls class="lightboxMedia"><source src="assets/images/${this.firstname}/${this.currentElement.video}" type="video/mp4"></video>
                    <p class="mediaTitle spacing">${this.currentElement.title}</p>`;
        }
        document.getElementById("divMediaLightbox").innerHTML = media;

        // Gestion de l'accessiblité sur la modale et le main, à l'ouverture de la lightbox
        document.getElementById("main").ariaHidden = "true";
        document.getElementById("lightbox").ariaHidden = "false";
        document.querySelector("#lightbox").classList.add("displayMedia");
    }

    // Gestion des évènements pour les boutons de la lightbox
    manageEvents(){

        // Passage au média précédent
        document.querySelector("#lightbox .previousMedia").addEventListener("click", () => {
            this.previous();
        });

        // Passage au média suivant
        document.querySelector("#lightbox .nextMedia").addEventListener("click", () => {
            this.next();
        });

        // Fermeture lors du clic sur la croix
        document.querySelector("#lightbox .closeLightbox").addEventListener("click", () => {
            this.close();
        });

        // Fermeture de la lightbox lors du clic sur l'arrière plan
        document.querySelector("#lightbox").addEventListener("click", (e) => {
            if (e.target == e.currentTarget) {
                this.close(); 
            }            
        });

        // Gestion de la navigation au clavier
        const focusableElements = document.querySelectorAll("#lightbox .nextMedia, #lightbox .previousMedia, #lightbox .closeLightbox");
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[(focusableElements.length - 1)];

        document.querySelector("#lightbox").addEventListener("keydown", (e) =>{      
            
            // Gestion des boutons de la lightbox à atteindre via Tab/Shift + Tab
            if(e.target == lastElement){
                // @ts-ignore
                if(!e.shiftKey && e.key === "Tab"){
                    e.preventDefault();
                    document.getElementById(firstElement.id).focus();
                }
            }else if(e.target == firstElement){
                // @ts-ignore
                if(e.shiftKey && e.key === 'Tab'){
                    e.preventDefault();
                    document.getElementById(lastElement.id).focus();
                }
            }

            // Gestion des flèches pour naviguer entre les médias et Echap pour fermer la lightbox
            // @ts-ignore
            switch (e.key){
                case "ArrowLeft":
                    e.preventDefault();
                    this.previous();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    this.next();
                    break;
                case "Escape":
                    e.preventDefault();
                    this.close();
                    break;
            }
    
        });
    }

    // Récupération des données concernant le média à afficher
    getElementById(id){
        return this.mediasList.find(media => media.id == id);
    }
}