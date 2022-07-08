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
        document.getElementById(field.id).parentElement.dataset.error = "";
        document.getElementById(field.id).dataset.valid = "";
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
            console.log(field.name + " : " + field.value);
        }
    } else {
        console.log("Le formulaire n'est pas valide");
    }
}