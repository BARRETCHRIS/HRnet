// Expressions régulières pour valider divers champs de formulaire.
// - nameRegex : Valide que le nom contient au moins 2 lettres (majuscule ou minuscule).
// export const nameRegex = /^[A-Za-z]{2,}$/; // Au moins 2 lettres
export const nameRegex = /^[A-Za-z\s'-]{2,}$/;

// - zipCodeRegex : Valide que le code postal est composé exactement de 5 chiffres.
export const zipCodeRegex = /^\d{5}$/; // Code postal à 5 chiffres

// - streetRegex : Valide que la rue contient au moins 3 caractères, acceptant lettres, chiffres,
//   espaces et certains caractères spéciaux (comme ', -).
export const streetRegex = /^[A-Za-z0-9\s,'-]{3,}$/; // Lettres, chiffres et certains caractères spéciaux

// - cityRegex : Valide que la ville contient au moins 2 lettres et peut inclure des espaces.
export const cityRegex = /^[A-Za-z\s'-]{2,}$/; // Lettres et espaces seulement

// Fonction pour valider un champ à l'aide d'une expression régulière.
// - value : Valeur du champ à valider.
// - regex : Expression régulière à utiliser pour la validation.
// - Retourne un booléen indiquant si la valeur correspond à l'expression régulière.
export const validateField = (value, regex) => {
    return regex.test(value); // Teste la valeur contre l'expression régulière fournie.
};

// Fonction pour gérer la validation complète d'un formulaire en vérifiant chaque champ.
// - fields : Objet contenant les valeurs des champs du formulaire à valider.
// - Retourne un objet contenant les erreurs de validation, si présentes.
export const validateForm = (fields) => {
    const errors = {}; // Initialisation d'un objet pour stocker les erreurs de validation.

    // Validation des champs en utilisant validateField.
    if (!validateField(fields.firstName, nameRegex)) {
        errors.firstName = "First Name must contain at least 2 letters"; // Message d'erreur pour le prénom.
    }
    if (!validateField(fields.lastName, nameRegex)) {
        errors.lastName = "Last Name must contain at least 2 letters"; // Message d'erreur pour le nom de famille.
    }
    if (!validateField(fields.street, streetRegex)) {
        errors.street = "Street must contain at least 3 characters"; // Message d'erreur pour la rue.
    }
    if (!validateField(fields.city, cityRegex)) {
        errors.city = "City must contain at least 2 letters"; // Message d'erreur pour la ville.
    }
    if (!validateField(fields.zipCode, zipCodeRegex)) {
        errors.zipCode = "Zip Code must be 5 digits"; // Message d'erreur pour le code postal.
    }

    return errors; // Retourne l'objet contenant les erreurs de validation, s'il y en a.
};