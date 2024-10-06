import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";  // Importation des composants nécessaires pour la gestion du routage
import { lazy, Suspense } from "react";  // Importation des fonctions pour le chargement dynamique et la gestion de l'attente
import { EmployeeProvider } from "../context/EmployeeContext";  // Import du fournisseur de contexte pour l'état des employés

// Chargement dynamique des composants des pages pour optimiser le chargement de l'application
const Home = lazy(() => import("../pages/home/Home"));  // Page d'accueil
const CreateEmployee = lazy(() => import("../pages/createEmployee/CreateEmployee"));  // Page pour créer un nouvel employé
const EmployeeList = lazy(() => import("../pages/employeeList/EmployeeList"));  // Page pour afficher la liste des employés
const Error404 = lazy(() => import("../pages/error/Error404"));  // Page d'erreur 404 pour les routes non trouvées
const Header = lazy(() => import("../components/header/Header"));  // Composant d'en-tête de l'application
const Footer = lazy(() => import("../components/footer/Footer"));  // Composant de pied de page de l'application

// Composant principal de l'application
function App() {
    return (
        <EmployeeProvider>  {/* Enveloppe l'application avec le fournisseur de contexte pour fournir l'état des employés */}
            <Router>  {/* Configuration du routage de l'application */}
                <Suspense fallback={<div>Loading...</div>}>  {/* Affiche un message de chargement pendant le chargement des composants */}
                    <Header />  {/* Affichage du composant d'en-tête */}
                    <Routes>  {/* Définition des routes de l'application */}
                        <Route path="/employee-list" element={<Navigate to="/list" />} />  {/* Redirection de /employee-list vers /list */}
                        <Route path="/" element={<Home />} />  {/* Route vers la page d'accueil */}
                        <Route path="/create" element={<CreateEmployee />} />  {/* Route vers la page de création d'employé */}
                        <Route path="/list" element={<EmployeeList />} />  {/* Route vers la page de liste des employés */}
                        <Route path="*" element={<Error404 />} />  {/* Route pour gérer toutes les autres routes non définies (404) */}
                    </Routes>
                    <Footer />  {/* Affichage du composant de pied de page */}
                </Suspense>
            </Router>
        </EmployeeProvider>
    );
}

export default App;  // Exportation du composant App pour utilisation dans d'autres parties de l'application