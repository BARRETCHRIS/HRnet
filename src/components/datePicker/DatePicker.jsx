// Importation du composant ReactDatePicker et de son fichier de style CSS associé.
// - ReactDatePicker : Un composant de sélection de date réutilisable fourni par la bibliothèque 'react-datepicker'.
// - CSS : Le fichier de styles par défaut pour assurer le bon affichage visuel du sélecteur de date.
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Composant DatePicker personnalisé pour envelopper ReactDatePicker.
// - props : Reçoit les propriétés (props) passées par le composant parent, telles que selectedDate et onChange.
const DatePicker = props => {
  // Extraction des props :
  // - selectedDate : La date actuellement sélectionnée dans le sélecteur.
  // - onChange : La fonction de rappel appelée lors de la modification de la date (gérée par le parent).
  const { selectedDate, onChange } = props;

  // Retourne le composant ReactDatePicker avec les props fournies.
  // - selected : Détermine la date qui sera affichée par défaut dans le sélecteur.
  // - onChange : Permet de notifier le parent à chaque changement de sélection de date.
  // - dateFormat : Définit le format d'affichage des dates (jour/mois/année).
  // - {...props} : Permet de passer toutes les autres props au composant ReactDatePicker pour plus de flexibilité.
  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="dd/MM/yyyy" // Spécifie le format d'affichage des dates.
      {...props} // Transmet toutes les autres propriétés supplémentaires.
    />
  );
};

// Exportation du composant pour permettre son utilisation dans d'autres parties de l'application.
export default DatePicker;