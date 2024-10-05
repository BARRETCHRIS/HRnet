// Importation des styles pour le composant Modal.
// - modal.scss : Contient les styles CSS nécessaires pour le rendu et la mise en forme du modal.
import './modal.scss';

// Composant Modal qui affiche un contenu superposé si la condition isOpen est remplie.
// - isOpen : Booléen indiquant si le modal doit être affiché ou non.
// - onClose : Fonction de rappel pour fermer le modal lorsque l'utilisateur clique sur le bouton de fermeture.
// - children : Contenu à afficher à l'intérieur du modal, transmis en tant qu'enfants du composant.
const Modal = ({ isOpen, onClose, children }) => {
  // Si isOpen est faux, le composant ne retourne rien (rien n'est affiché).
  // Cela évite le rendu du modal si celui-ci ne doit pas être affiché.
  if (!isOpen) return null;

  // Rendu du modal :
  // - modal-overlay : Une couche semi-transparente derrière le modal pour assombrir le reste de l'interface.
  // - modal : La fenêtre de contenu qui affiche le message ou les éléments passés en children.
  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Bouton de fermeture du modal qui appelle la fonction onClose lors d'un clic. */}
        <button className="modal-close" onClick={onClose}>
          &times; {/* Symbole '×' pour fermer le modal */}
        </button>
        {/* Affichage du contenu passé en tant qu'enfants (children) du composant Modal. */}
        {children}
      </div>
    </div>
  );
};

// Exportation du composant Modal pour permettre son utilisation dans d'autres parties de l'application.
export default Modal;