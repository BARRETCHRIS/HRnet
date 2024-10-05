// Importation du composant 'EmployeeForm' qui gère le formulaire de création d'employé.
// Ce composant encapsule probablement la logique de gestion du formulaire (champs, validation, soumission).
// Cela permet de garder le composant 'CreateEmployee' simple et modulaire.
import EmployeeForm from "../../components/employeeForm/EmployeeForm";

// Définition du composant fonctionnel 'CreateEmployee'.
// Ce composant représente la page de création d'un nouvel employé au sein de l'application.
function CreateEmployee() {

    // Modification du titre de la page via l'objet 'document' du DOM.
    // Cela améliore l'expérience utilisateur en reflétant correctement le contexte de la page dans l'onglet du navigateur.
    document.title = 'Create | Wealth Health';

    // Rendu du composant qui encapsule la structure de la page de création d'employé.
    // La mise en page utilise des classes CSS définies ailleurs ('wrapper' et 'container') pour structurer et styliser le contenu.
    return (
        <main className="wrapper">
            {/* La classe 'container' permet de centrer et contraindre le contenu dans une largeur définie,
                suivant probablement une grille ou une structure de mise en page standard. */}
            <div className="container">
                
                {/* Titre de la section ou de la page. Ici, un simple <h2> pour indiquer la création d'un nouvel employé.
                    Cela aide à la lisibilité et au référencement (SEO) en structurant correctement les en-têtes. */}
                <h2>Create Employee</h2>

                {/* Rendu du formulaire de création d'employé.
                    Le composant 'EmployeeForm' gère l'intégralité de la logique du formulaire, ce qui rend ce composant 'CreateEmployee' léger
                    et centré sur la mise en page. */}
                <EmployeeForm />
            </div>
        </main>
    );
}

// Exportation du composant 'CreateEmployee' pour qu'il soit utilisé dans d'autres parties de l'application,
// probablement dans le système de routage (par exemple, dans App.jsx pour définir une route '/create').
export default CreateEmployee;