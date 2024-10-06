import React, { useState, lazy, Suspense } from "react";  // Importation de React et des hooks nécessaires
import { states } from "../../data/states";  // Importation des données des états
import { validateForm } from "../../utils/validation";  // Importation de la fonction de validation des formulaires
import useForm from "../../hooks/useForm";  // Importation du hook personnalisé pour gérer l'état du formulaire
import { useEmployee } from '../../context/EmployeeContext';  // Importation du contexte pour la gestion des employés

import './employeeForm.scss';  // Importation des styles pour le formulaire des employés

// Chargement dynamique des composants pour optimiser les performances de l'application
const AutoComplete = lazy(() => import("../autoComplete/AutoComplete"));  // Composant d'auto-complétion pour les états
const DatePicker = lazy(() => import("../datePicker/DatePicker"));  // Composant de sélection de date
const Modal = lazy(() => import("../modal/Modal"));  // Composant de modal pour afficher des messages

// Composant principal pour le formulaire d'employé
const EmployeeForm = () => {
  const { addEmployee } = useEmployee();  // Accès à la fonction d'ajout d'employé depuis le contexte
  const initialEmployeeData = {  // État initial des données de l'employé
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    street: '',
    city: '',
    state: states[0].abbreviation,  // Définition de l'état par défaut
    zipCode: '',
    department: '',
  };

  // Utilisation du hook personnalisé pour gérer les valeurs et les erreurs du formulaire
  const { values, errors, handleChange, setValues, setErrors } = useForm(initialEmployeeData);
  const [isModalOpen, setModalOpen] = useState(false);  // État pour gérer l'affichage du modal

  // Fonction pour formater la date au format DD/MM/YYYY
  const formatDateToDDMMYYYY = (date) => {
    if (!date) return null;  // Retourne null si aucune date n'est fournie
    const day = String(date.getDate()).padStart(2, '0');  // Ajoute un zéro devant le jour si nécessaire
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Ajoute un zéro devant le mois si nécessaire
    const year = date.getFullYear();  // Récupère l'année
    return `${day}/${month}/${year}`;  // Retourne la date au format souhaité
  };

  // Fonction pour gérer le changement de date dans le formulaire
  const handleDateChange = (key, date) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: date,  // Met à jour la valeur correspondant à la clé spécifiée
    }));
  };

  // Fonction pour gérer la sélection d'un état
  const handleStateSelect = (selectedState) => {
    setValues((prevValues) => ({
      ...prevValues,
      state: selectedState.abbreviation,  // Met à jour l'état avec l'abréviation de l'état sélectionné
    }));
  };

  // Fonction pour gérer la sauvegarde des données de l'employé
  const handleSave = () => {
    const validationErrors = validateForm(values);  // Validation des valeurs du formulaire

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);  // Si des erreurs de validation sont trouvées, les mettre à jour dans l'état
      return;  // Arrête le traitement si des erreurs existent
    }

    // Formatage des données de l'employé avant de les enregistrer
    const formattedEmployeeData = {
      ...values,
      dateOfBirth: formatDateToDDMMYYYY(values.dateOfBirth),  // Formate la date de naissance
      startDate: formatDateToDDMMYYYY(values.startDate),  // Formate la date de début
    };

    // Utilisation du contexte pour ajouter l'employé sans avoir besoin de localStorage
    addEmployee(formattedEmployeeData);

    console.log('Employee Data Saved:', formattedEmployeeData);  // Log des données de l'employé sauvegardées

    setModalOpen(true);  // Ouvre le modal après la sauvegarde
    setErrors({});  // Réinitialise les erreurs
  };

  return (
    <form className="form">  {/* Rendu du formulaire d'employé */}
      {/* Champs du formulaire pour le prénom */}
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={values.firstName}
        onChange={handleChange}  // Gestion du changement de valeur
        className={errors.firstName ? 'error' : ''}  // Applique une classe d'erreur si nécessaire
      />
      {errors.firstName && <span className="error">{errors.firstName}</span>}  {/* Affiche l'erreur si elle existe */}

      {/* Champs du formulaire pour le nom de famille */}
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={values.lastName}
        onChange={handleChange}
        className={errors.lastName ? 'error' : ''}  // Applique une classe d'erreur si nécessaire
      />
      {errors.lastName && <span className="error">{errors.lastName}</span>}  {/* Affiche l'erreur si elle existe */}

      {/* Sélecteur de date de naissance */}
      <label htmlFor="dateOfBirth">Date of Birth</label>
      <Suspense fallback={<div>Loading...</div>}>  {/* Affiche un message de chargement pendant le chargement du composant */}
        <DatePicker
          id="dateOfBirth"
          selectedDate={values.dateOfBirth}  // Valeur sélectionnée
          onChange={(date) => handleDateChange('dateOfBirth', date)}  // Gestion du changement de date
        />
      </Suspense>

      {/* Sélecteur de date de début */}
      <label htmlFor="startDate">Start Date</label>
      <Suspense fallback={<div>Loading...</div>}>
        <DatePicker
          id="startDate"
          selectedDate={values.startDate}  // Valeur sélectionnée
          onChange={(date) => handleDateChange('startDate', date)}  // Gestion du changement de date
        />
      </Suspense>

      <fieldset className="address">  {/* Champ de regroupement pour l'adresse */}
        <legend>Address</legend>

        {/* Champs pour la rue */}
        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          id="street"
          value={values.street}
          onChange={handleChange}
          className={errors.street ? 'error' : ''}  // Applique une classe d'erreur si nécessaire
        />
        {errors.street && <span className="error">{errors.street}</span>}  {/* Affiche l'erreur si elle existe */}

        {/* Champs pour la ville */}
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          value={values.city}
          onChange={handleChange}
          className={errors.city ? 'error' : ''}  // Applique une classe d'erreur si nécessaire
        />
        {errors.city && <span className="error">{errors.city}</span>}  {/* Affiche l'erreur si elle existe */}

        {/* Composant d'auto-complétion pour la sélection de l'état */}
        <AutoComplete options={states} onSelect={handleStateSelect} />  {/* Liste des états avec gestion de sélection */}

        {/* Champs pour le code postal */}
        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="number"
          name="zipCode"
          id="zipCode"
          value={values.zipCode}
          onChange={handleChange}
          className={errors.zipCode ? 'error' : ''}  // Applique une classe d'erreur si nécessaire
        />
        {errors.zipCode && <span className="error">{errors.zipCode}</span>}  {/* Affiche l'erreur si elle existe */}
      </fieldset>

      {/* Sélecteur de département */}
      <label htmlFor="department">Department</label>
      <select id="department" name="department" onChange={handleChange}>  {/* Gestion du changement de sélection */}
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="Engineering">Engineering</option>
        <option value="Human Resources">Human Resources</option>
        <option value="Legal">Legal</option>
      </select>

      {/* Bouton de sauvegarde */}
      <button className="save" type="button" onClick={handleSave}>
        Save
      </button>

      {/* Modal pour confirmation de la création de l'employé */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        Employee Created!  {/* Message affiché dans le modal */}
      </Modal>
    </form>
  );
};

export default EmployeeForm;  // Exportation du composant EmployeeForm pour utilisation dans d'autres parties de l'application



// import React, { useState, lazy, Suspense } from "react";
// import { states } from "../../data/states";
// import { validateForm } from "../../utils/validation";
// import useForm from "../../hooks/useForm";
// import { useEmployee } from '../../context/EmployeeContext';  // Importer le contexte

// import './employeeForm.scss';

// const AutoComplete = lazy(() => import("../autoComplete/AutoComplete"));
// const DatePicker = lazy(() => import("../datePicker/DatePicker"));
// const Modal = lazy(() => import("../modal/Modal"));

// const EmployeeForm = () => {
//   const { addEmployee } = useEmployee();  // Accès à la fonction d'ajout d'employé depuis le contexte
//   const initialEmployeeData = {
//     firstName: '',
//     lastName: '',
//     dateOfBirth: null,
//     startDate: null,
//     street: '',
//     city: '',
//     state: states[0].abbreviation,
//     zipCode: '',
//     department: '',
//   };

//   const { values, errors, handleChange, setValues, setErrors } = useForm(initialEmployeeData);
//   const [isModalOpen, setModalOpen] = useState(false);

//   const formatDateToDDMMYYYY = (date) => {
//     if (!date) return null;
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleDateChange = (key, date) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       [key]: date,
//     }));
//   };

//   const handleStateSelect = (selectedState) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       state: selectedState.abbreviation,
//     }));
//   };

//   const handleSave = () => {
//     const validationErrors = validateForm(values);

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const formattedEmployeeData = {
//       ...values,
//       dateOfBirth: formatDateToDDMMYYYY(values.dateOfBirth),
//       startDate: formatDateToDDMMYYYY(values.startDate),
//     };

//     // Utiliser le contexte pour ajouter l'employé sans localStorage
//     addEmployee(formattedEmployeeData);

//     console.log('Employee Data Saved:', formattedEmployeeData);

//     setModalOpen(true);
//     setErrors({});
//   };

//   return (
//     <form className="form">
//       {/* Le formulaire reste identique */}
//       <label htmlFor="firstName">First Name</label>
//       <input
//         type="text"
//         name="firstName"
//         id="firstName"
//         value={values.firstName}
//         onChange={handleChange}
//         className={errors.firstName ? 'error' : ''}
//       />
//       {errors.firstName && <span className="error">{errors.firstName}</span>}

//       <label htmlFor="lastName">Last Name</label>
//       <input
//         type="text"
//         name="lastName"
//         id="lastName"
//         value={values.lastName}
//         onChange={handleChange}
//         className={errors.lastName ? 'error' : ''}
//       />
//       {errors.lastName && <span className="error">{errors.lastName}</span>}

//       <label htmlFor="dateOfBirth">Date of Birth</label>
//       <Suspense fallback={<div>Loading...</div>}>
//         <DatePicker
//           id="dateOfBirth"
//           selectedDate={values.dateOfBirth}
//           onChange={(date) => handleDateChange('dateOfBirth', date)}
//         />
//       </Suspense>

//       <label htmlFor="startDate">Start Date</label>
//       <Suspense fallback={<div>Loading...</div>}>
//         <DatePicker
//           id="startDate"
//           selectedDate={values.startDate}
//           onChange={(date) => handleDateChange('startDate', date)}
//         />
//       </Suspense>

//       <fieldset className="address">
//         <legend>Address</legend>

//         <label htmlFor="street">Street</label>
//         <input
//           type="text"
//           name="street"
//           id="street"
//           value={values.street}
//           onChange={handleChange}
//           className={errors.street ? 'error' : ''}
//         />
//         {errors.street && <span className="error">{errors.street}</span>}

//         <label htmlFor="city">City</label>
//         <input
//           type="text"
//           name="city"
//           id="city"
//           value={values.city}
//           onChange={handleChange}
//           className={errors.city ? 'error' : ''}
//         />
//         {errors.city && <span className="error">{errors.city}</span>}

//         <AutoComplete options={states} onSelect={handleStateSelect} />

//         <label htmlFor="zipCode">Zip Code</label>
//         <input
//           type="number"
//           name="zipCode"
//           id="zipCode"
//           value={values.zipCode}
//           onChange={handleChange}
//           className={errors.zipCode ? 'error' : ''}
//         />
//         {errors.zipCode && <span className="error">{errors.zipCode}</span>}
//       </fieldset>

//       <label htmlFor="department">Department</label>
//       <select id="department" name="department" onChange={handleChange}>
//         <option value="Sales">Sales</option>
//         <option value="Marketing">Marketing</option>
//         <option value="Engineering">Engineering</option>
//         <option value="Human Resources">Human Resources</option>
//         <option value="Legal">Legal</option>
//       </select>

//       <button className="save" type="button" onClick={handleSave}>
//         Save
//       </button>

//       <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
//         Employee Created!
//       </Modal>
//     </form>
//   );
// };

// export default EmployeeForm;