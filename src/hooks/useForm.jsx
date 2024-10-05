// Importation du hook useState de React pour gérer l'état local.
// - useState : Permet de déclarer des variables d'état dans le composant personnalisé useForm.
import { useState } from 'react';

// Hook personnalisé useForm pour gérer l'état des formulaires de manière réutilisable.
// - initialValues : Un objet représentant les valeurs initiales du formulaire, 
//                  généralement passé par le composant qui utilise ce hook.
const useForm = (initialValues) => {
  // État local pour stocker les valeurs des champs du formulaire.
  // - values : Un objet qui contient les valeurs actuelles des champs.
  // - setValues : Fonction pour mettre à jour les valeurs des champs.
  const [values, setValues] = useState(initialValues);

  // État local pour stocker les erreurs de validation du formulaire.
  // - errors : Un objet qui contient les messages d'erreur pour chaque champ, initialisé comme vide.
  const [errors, setErrors] = useState({});

  // Fonction pour gérer les changements dans les champs du formulaire.
  // - event : L'événement déclenché lors d'un changement dans un champ de formulaire.
  const handleChange = (event) => {
    const { name, value } = event.target; // Extraction du nom et de la valeur du champ modifié.

    // Mise à jour des valeurs du formulaire, en préservant les autres champs non modifiés.
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Met à jour le champ correspondant avec la nouvelle valeur.
    }));
  };

  // Retourne un objet contenant les valeurs actuelles, les erreurs, et les fonctions de gestion du formulaire.
  return {
    values,        // Valeurs des champs du formulaire.
    errors,        // Erreurs de validation du formulaire.
    handleChange,  // Fonction pour gérer les changements des champs.
    setValues,     // Exposition de setValues pour permettre des mises à jour directes des valeurs.
    setErrors,     // Exposition de setErrors pour permettre la gestion des erreurs.
  };
};

// Exportation du hook useForm pour permettre son utilisation dans d'autres composants.
export default useForm;