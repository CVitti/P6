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
    const fullName = document.querySelector("h1.name").innerText;
    document.getElementById("h2Contact").innerHTML = "Contactez-moi " + fullName;
    modal.style.display = "flex";
}

/**
 * Fermeture de la fenêtre modale de Contact
 */
function closeModal() {
    const modal = document.getElementById("contact_modal");
    for (const field of fields) {
        field.removeAttribute("data-error");
        field.removeAttribute("data-valid");
    }
    document.forms["formContact"].reset();
    modal.style.display = "none";
}

/**
 * 
 * @returns Retourne la validité du champ à vérifier
 */
function checkFieldValidity(input){

    // Par défaut, le champ est positionné comme valide avant vérification
    let valid = true;
    let error = null;

    // Vérification des différents types d'erreur possibles
    if(input.validity.tooShort){
        valid = false;
        error = `Ce champ doit contenir au minimum ${input.minLength} caractères.`;
    }else if(input.validity.valueMissing){
        valid = false;
        error = `Ce champ est obligatoire pour valider le formulaire.`;
    }else if(input.validity.patternMismatch){
        valid = false;
        if (input.id == "inputFirstname" || input.id == "inputLastname") {
            error = `Ce champ ne peut contenir que des lettres (avec ou sans accent), des tirets ou des espaces.`;
        } 
    }else if(input.validity.typeMismatch){
        valid = false;
        if (input.id == "inputFirstname" || input.id == "inputLastname") {
            error = `Ce champ doit contenir du texte`;
        } else if(input.id == "inputEmail"){
            error = `Ce champ doit contenir une adresse email valide : example@mail.com`;
        }
    }

    // Si une erreur est retournée, ajout de l'attribut error dans le dataset pour afficher l'erreur via le CSS
    if (error != null) {
        switch (input.id) {
            case "inputFirstname":
                document.getElementById("divFirstname").setAttribute("data-error", error);
                break;
            case "inputLastname":
                document.getElementById("divLastname").setAttribute("data-error", error);
                break;
            case "inputEmail":
                document.getElementById("divEmail").setAttribute("data-error", error);
                break;
            case "inputMessage":
                document.getElementById("divMessage").setAttribute("data-error", error);
                break;
        }
    }
    // Cas où aucune erreur n'est détectée sur le champ, suppression de l'attribut error
    else{ 
        switch (input.id) {
            case "inputFirstname":
                document.getElementById("divFirstname").removeAttribute("data-error");
                break;
            case "inputLastname":
                document.getElementById("divLastname").removeAttribute("data-error");
                break;
            case "inputEmail":
                document.getElementById("divEmail").removeAttribute("data-error");
                break;
            case "inputMessage":
                document.getElementById("divMessage").removeAttribute("data-error");
                break;
        }
    }

    // Selon si le champ est valide ou non, modification de l'attribut valid du dataset pour la mise en forme du champ vérifié
    if(valid){
        input.dataset.valid = "true";
    }else{
        input.dataset.valid = "false";
    }

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
            console.log(field.name + " : " + field.value);
        }
    } else {
        console.log("Le formulaire n'est pas valide");
    }
}