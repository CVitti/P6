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
        document.querySelector("#lightbox").classList.remove("displayMedia");
    }

    displayMedia(){
        let media = "";
        if(this.currentElement.image){
            media = `<img src="assets/images/${this.firstname}/${this.currentElement.image}" alt="${this.currentElement.title}" class="lightboxMedia">
                    <h2 class="mediaTitle spacing">${this.currentElement.title}</h2>`;
        }else if(this.currentElement.video){
            media = `<video controls class="lightboxMedia"><source src="assets/images/${this.firstname}/${this.currentElement.video}" type="video/mp4"></video>
                    <h2 class="mediaTitle spacing">${this.currentElement.title}</h2>`;
        }
        document.getElementById("divMediaLightbox").innerHTML = media;
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

        // Gestion de la navigation au clavier sur la lightbox
        document.querySelector("#lightbox").addEventListener("keyup", (e) => {
            switch (e.key){
                case "ArrowLeft":
                    this.previous();
                    break;
                case "ArrowRight":
                    this.next();
                    break;
                case "Escape":
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