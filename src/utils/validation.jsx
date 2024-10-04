export const nameRegex = /^[A-Za-z]{2,}$/; // Au moins 2 lettres
export const zipCodeRegex = /^\d{5}$/; // Code postal à 5 chiffres
export const streetRegex = /^[A-Za-z0-9\s,'-]{3,}$/; // Lettres, chiffres et certains caractères spéciaux
export const cityRegex = /^[A-Za-z\s]{2,}$/; // Lettres et espaces seulement

// Fonction pour valider un champ avec une regex
export const validateField = (value, regex) => {
    return regex.test(value);
};

// Fonction pour gérer la validation complète d'un formulaire
export const validateForm = (fields) => {
    const errors = {};
    
    // Validation des champs
    if (!validateField(fields.firstName, nameRegex)) {
        errors.firstName = "First Name must contain at least 2 letters";
    }
    if (!validateField(fields.lastName, nameRegex)) {
        errors.lastName = "Last Name must contain at least 2 letters";
    }
    if (!validateField(fields.street, streetRegex)) {
        errors.street = "Street must contain at least 3 characters";
    }
    if (!validateField(fields.city, cityRegex)) {
        errors.city = "City must contain at least 2 letters";
    }
    if (!validateField(fields.zipCode, zipCodeRegex)) {
        errors.zipCode = "Zip Code must be 5 digits";
    }

    return errors; // Retourne un objet contenant les erreurs, s'il y en a
};