// Ajout d'un controle de saisie à chaque saisie dans un champ
const fields = document.querySelectorAll("#formContact input, #formContact textarea");
for (const field of fields) {
    field.addEventListener("keyup", (e) =>{
        checkFieldValidity(e.target);
    });
}

// Ajout de la vérification du formulaire lors du clic sur le bouton
document.querySelector("#submitContact")?.addEventListener("click", (e) =>{
    confirmForm(e);
});

/**
 * Ouverture de la fenêtre modale de Contact
 */
function displayModal() {
    const modal = document.getElementById("contact_modal");
    // @ts-ignore
    const fullName = document.querySelector("h1.name").innerText;
    const focusableElements = document.querySelectorAll("#contact_modal input, #contact_modal textarea, #contact_modal  img, #contact_modal button");
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[(focusableElements.length - 1)];

    // Ajout du nom du photographe dans le titre de la modale
    document.getElementById("h2Contact").innerHTML = "Contactez-moi " + fullName;
    
    // Affichage de la modale
    modal.style.display = "flex";

    // Gestion de l'accessiblité sur la modale et le main, à l'ouverture de la modale
    document.getElementById("main").ariaHidden = "true";
    document.getElementById("contact_modal").ariaHidden = "false";

    // Fermeture de la modale lors de l'appui sur Echap, gestion de la navigation au clavier avec tab
    document.getElementById("contact_modal").focus(); 

    document.querySelector("#contact_modal").addEventListener("keydown", (e) =>{
        const currentElement = e.target;

        // @ts-ignore
        if (e.key === "Escape" || (e.key === "Enter" && currentElement == firstElement)){
            e.preventDefault();
            closeModal();            
        }else if(currentElement == lastElement){
            // @ts-ignore
            if(!e.shiftKey && e.key === "Tab"){
                e.preventDefault();
                document.getElementById(firstElement.id).focus();
            }
        }else if(currentElement == firstElement){
            // @ts-ignore
            if(e.shiftKey && e.key === 'Tab'){
                e.preventDefault();
                document.getElementById(lastElement.id).focus();
            }
        }

    });
}

/**
 * Fermeture de la fenêtre modale de Contact
 */
function closeModal() {
    const modal = document.getElementById("contact_modal");

    // Réinitialisation des dataset sur les champ pour retirer les erreurs
    for (const field of fields) {
        document.getElementById(field.id).parentElement.dataset.error = "";
        document.getElementById(field.id).dataset.valid = "";
    }
    // Reset du formulaire
    document.forms["formContact"].reset();

    modal.style.display = "none";

    // Gestionde l'accessiblité sur la modale et le main, à la fermeture de la modale
    document.getElementById("main").ariaHidden = "false";
    document.getElementById("contact_modal").ariaHidden = "true";
    document.getElementById("openModal").focus();
}

/**
 * 
 * @returns Retourne la validité du champ à vérifier
 */
function checkFieldValidity(input){

    // Par défaut, le champ est positionné comme valide avant vérification
    let valid = true;
    let errorText = null;

    // Vérification des différents types d'erreur possibles
    if(input.validity.tooShort){
        valid = false;
        errorText = `Ce champ doit contenir au minimum ${input.minLength} caractères.`;
    }else if(input.validity.valueMissing){
        valid = false;
        errorText = `Ce champ est obligatoire pour valider le formulaire.`;
    }else if(input.validity.patternMismatch){
        valid = false;
        if (input.id == "inputFirstname" || input.id == "inputLastname") {
            errorText = `Ce champ ne peut contenir que des lettres (avec ou sans accent), des tirets ou des espaces.`;
        } 
    }else if(input.validity.typeMismatch){
        valid = false;
        if (input.id == "inputFirstname" || input.id == "inputLastname") {
            errorText = `Ce champ doit contenir du texte`;
        } else if(input.id == "inputEmail"){
            errorText = `Ce champ doit contenir une adresse email valide : example@mail.com`;
        }
    }else{
        errorText = "";
    }

    // Ajout de l'erreur dans le dataset du parent contenant l'input en erreur, pour affichage via le css (pseudo-élément ::after)
    document.getElementById(input.id).parentElement.dataset.error = errorText;

    // Modification de l'attribut valid du dataset pour la mise en forme (via CSS) du champ vérifié
    input.dataset.valid = valid;
    return valid;
}

/**
 * Vérification des champs du formulaire lors du clic sur le bouton
 */
function confirmForm(e){
    // Annulation du submit du formulaire lors du clic sur le bouton
    e.preventDefault();

    // Vérification de tous les champs pour s'assurer de la validité du formulaire
    let hasInvalidField = false;
    for (const field of fields) {
        if (hasInvalidField == false){
            const isFieldValid = checkFieldValidity(field);
            if (isFieldValid == false) {
                hasInvalidField = true
            }
        }
    }

    // Nettoyage de la console pour afficher, soit le contenu des champs, soit un erreur si formulaire non valide
    console.clear();
    if (hasInvalidField == false) {
        for (const field of fields) {
            // @ts-ignore
            console.log(field.name + " : " + field.value);
        }
    } else {
        console.log("Le formulaire n'est pas valide");
    }
}