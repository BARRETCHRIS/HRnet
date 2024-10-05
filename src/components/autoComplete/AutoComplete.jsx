// Importation des hooks React pour gérer l'état local et les effets secondaires.
// - useState : Permet de gérer l'état interne de la sélection d'options.
// - useEffect : Non utilisé dans cette version mais disponible si des effets sont nécessaires.
import { useState, useEffect } from 'react';

// Composant AutoComplete pour afficher une liste déroulante d'options.
// - options : Tableau d'objets passé en prop contenant les options de sélection (par exemple, les états).
// - onSelect : Fonction de rappel (callback) appelée lorsqu'une option est sélectionnée par l'utilisateur.
const AutoComplete = ({ options, onSelect }) => {
  // État local pour gérer l'option actuellement sélectionnée dans la liste déroulante.
  // Initialisé à la première option (par défaut), ici l'abréviation du premier état (par ex., Alabama).
  const [selectedState, setSelectedState] = useState(options[0].abbreviation);

  // Gestionnaire de changement de sélection (appelé lorsqu'un utilisateur change l'option dans le <select>).
  // - e : L'événement de changement de sélection.
  const handleChange = (e) => {
    const selectedValue = e.target.value; // Récupération de la valeur sélectionnée dans la liste.
    setSelectedState(selectedValue); // Mise à jour de l'état local avec la nouvelle valeur sélectionnée.

    // Recherche de l'option correspondante dans le tableau des options en fonction de l'abréviation sélectionnée.
    const selectedOption = options.find(option => option.abbreviation === selectedValue);

    // Appel de la fonction de rappel onSelect avec l'option sélectionnée pour informer le composant parent.
    onSelect(selectedOption);
  };

  // Rendu du composant :
  // - Label pour le champ de sélection (ici l'état).
  // - Select : Affiche une liste déroulante avec les options fournies.
  // - Chaque option est mappée à partir du tableau options et contient une clé unique basée sur l'abréviation.
  return (
    <div>
      <label htmlFor="state">State</label>
      <select id="state" value={selectedState} onChange={handleChange}>
        {options.map((option) => (
          // Chaque option de la liste est affichée avec l'abréviation comme valeur et le nom comme texte visible.
          <option key={option.abbreviation} value={option.abbreviation}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// Exportation du composant pour qu'il puisse être utilisé dans d'autres fichiers (par exemple, dans un formulaire).
export default AutoComplete;