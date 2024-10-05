// Importation des composants principaux depuis 'react-router-dom' pour gérer le routage côté client.
// - BrowserRouter : Renommé en "Router" pour faciliter l'utilisation, encapsule l'application et gère l'historique de navigation.
// - Routes : Composant conteneur pour l'ensemble des routes de l'application.
// - Route : Définit chaque chemin URL et le composant associé.
// - Navigate : Utilisé pour rediriger une route vers une autre, ce qui simplifie la gestion des chemins obsolètes ou modifiés.
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Importation des utilitaires 'lazy' et 'Suspense' de React pour implémenter le lazy loading.
// - lazy : Charge les composants dynamiquement, réduisant ainsi la taille du bundle initial et optimisant les performances.
// - Suspense : Affiche un fallback en attendant le chargement des composants asynchrones, évitant des retards visibles dans l'interface utilisateur.
import { lazy, Suspense } from "react";

// Importation des styles spécifiques de l'application, qui couvrent probablement la mise en page et les éléments visuels principaux.
import './App.scss';

// Implémentation du lazy loading pour plusieurs composants.
// Ces composants ne sont chargés qu'au moment où l'utilisateur en a besoin, minimisant ainsi le temps de chargement initial de l'application
// et améliorant l'expérience utilisateur en optimisant l'utilisation des ressources.
// Cela est particulièrement utile pour les applications complexes avec plusieurs pages.
const Home = lazy(() => import("../pages/home/Home"));
const CreateEmployee = lazy(() => import("../pages/createEmployee/CreateEmployee"));
const EmployeeList = lazy(() => import("../pages/employeeList/EmployeeList"));
const Error404 = lazy(() => import("../pages/error/Error404"));
const Header = lazy(() => import("../components/header/Header"));
const Footer = lazy(() => import("../components/footer/Footer"));

// Fonction principale 'App' qui définit la structure globale de l'application.
// La fonction encapsule la logique de routage, gère le rendu différé des composants avec lazy loading,
// et assure l'affichage correct des éléments d'interface comme l'en-tête (Header) et le pied de page (Footer).
function App() {
    return (
        // Le composant Router est essentiel pour gérer la navigation dans une application React à page unique (SPA).
        // Il permet de maintenir l'état de navigation dans l'URL sans nécessiter de rechargements de page complets.
        <Router>
            {/* Suspense est utilisé ici pour encapsuler tous les composants chargés avec lazy loading.
                - Le fallback, ici un simple div "Loading...", sera affiché temporairement pendant le chargement des composants.
                - Cela améliore l'expérience utilisateur en donnant un retour visuel pendant les chargements asynchrones. */}
            <Suspense fallback={<div>Loading...</div>}>
                
                {/* Rendu du composant Header en haut de chaque page.
                    - Le composant Header est également chargé dynamiquement via lazy loading, retardant ainsi son chargement
                      jusqu'à ce que l'application soit prête à l'afficher. */}
                <Header />

                {/* Définition des routes de l'application, chacune associée à un composant spécifique.
                    - Routes encapsule l'ensemble des Route, permettant une gestion flexible du routage.
                    - Chaque Route associe un chemin URL à un composant, permettant une navigation fluide sans rechargement de page. */}
                <Routes>
                    {/* Redirection de l'ancienne route "/employee-list" vers "/list".
                        - Utilisation de Navigate pour gérer les redirections dans les applications SPA,
                          ce qui permet de conserver des liens stables et compatibles avec les anciennes versions. */}
                    <Route path="/employee-list" element={<Navigate to="/list" />} />

                    {/* Route principale pour la page d'accueil.
                        - Le composant Home est chargé dynamiquement via lazy loading pour minimiser le temps de chargement initial. */}
                    <Route path="/" element={<Home />} />

                    {/* Route pour la page de création d'employé.
                        - Le composant CreateEmployee est chargé uniquement lorsque cette page est visitée,
                          optimisant ainsi les performances et la gestion des ressources. */}
                    <Route path="/create" element={<CreateEmployee />} />

                    {/* Route pour afficher la liste des employés.
                        - Le composant EmployeeList est également chargé en mode lazy, évitant ainsi le chargement inutile
                          de grandes quantités de données au démarrage. */}
                    <Route path="/list" element={<EmployeeList />} />

                    {/* Route pour gérer toutes les URL non reconnues.
                        - Rend le composant Error404 pour afficher une page d'erreur utilisateur en cas de navigation vers une URL invalide.
                        - Cette approche assure une meilleure expérience utilisateur et évite les erreurs inattendues. */}
                    <Route path="*" element={<Error404 />} />
                </Routes>

                {/* Rendu du composant Footer au bas de chaque page.
                    - Comme pour le Header, le Footer est chargé de manière différée pour améliorer la performance globale. */}
                <Footer />
            </Suspense>
        </Router>
    );
}

// Exportation du composant 'App' pour qu'il soit utilisé dans d'autres parties de l'application, en particulier dans le fichier main.jsx.
// Cela suit le modèle modulaire de React, où chaque composant peut être isolé, testé et réutilisé de manière flexible.
export default App;


// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import { lazy, Suspense } from "react"; 
// import './App.scss';

// const Home = lazy(() => import("../pages/home/Home"));
// const CreateEmployee = lazy(() => import("../pages/createEmployee/CreateEmployee"));
// const EmployeeList = lazy(() => import("../pages/employeeList/EmployeeList"));
// const Error404 = lazy(() => import("../pages/error/Error404"));
// const Header = lazy(() => import("../components/header/Header"));
// const Footer = lazy(() => import("../components/footer/Footer"));

// function App() {
//     return (
//         <Router>
//             <Suspense fallback={<div>Loading...</div>}>
//                 <Header />
//                 <Routes>
//                     <Route path="/employee-list" element={<Navigate to="/list" />} />
//                     <Route path="/" element={<Home />} />
//                     <Route path="/create" element={<CreateEmployee />} />
//                     <Route path="/list" element={<EmployeeList />} />
//                     <Route path="*" element={<Error404 />} />
//                 </Routes>
//                 <Footer />
//             </Suspense>
//         </Router>
//     );
// }

// export default App;