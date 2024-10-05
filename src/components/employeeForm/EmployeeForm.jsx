// Importation des hooks React nécessaires à la gestion de l'état local et des effets.
// - useState : Permet de gérer les champs du formulaire et l'état du modal.
// - lazy et Suspense : Utilisés pour charger dynamiquement certains composants, optimisant ainsi les performances en chargeant ces composants uniquement lorsque nécessaire.
import React, { useState, lazy, Suspense, useEffect } from "react";

// Importation des données nécessaires pour le formulaire, comme la liste des états.
// - states : Tableau d'objets contenant les abréviations des états, utilisé pour la sélection de l'état.
import { states } from "../../data/states";

// Importation des utilitaires de validation pour vérifier les données saisies dans le formulaire avant leur soumission.
import { validateForm } from "../../utils/validation";

// Importation d'un hook personnalisé useForm pour encapsuler la logique de gestion de formulaire (gestion des valeurs et des erreurs).
import useForm from "../../hooks/useForm";

// Importation des styles spécifiques au formulaire d'employé.
import './employeeForm.scss';

// Chargement dynamique des composants avec React.lazy, permettant d'améliorer la performance en ne chargeant ces composants que lorsqu'ils sont nécessaires.
// AutoComplete : Composant pour suggérer et sélectionner des valeurs automatiquement.
// DatePicker : Composant de sélection de date.
// Modal : Composant modal affiché après la création réussie d'un employé.
const AutoComplete = lazy(() => import("../autoComplete/AutoComplete"));
const DatePicker = lazy(() => import("../datePicker/DatePicker"));
const Modal = lazy(() => import("../modal/Modal"));

// Définition du composant fonctionnel 'EmployeeForm', qui encapsule la logique de création et de soumission des données d'un nouvel employé.
const EmployeeForm = () => {
  // Initialisation des valeurs du formulaire avec un objet représentant un employé.
  // Chaque champ est géré par useForm pour faciliter la gestion des erreurs et des valeurs.
  const initialEmployeeData = {
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    street: '',
    city: '',
    state: states[0].abbreviation, // L'état par défaut est défini sur Alabama.
    zipCode: '',
    department: '',
  };

  // Utilisation du hook personnalisé useForm pour gérer les champs du formulaire.
  // - values : Contient les valeurs des champs du formulaire.
  // - errors : Contient les erreurs de validation pour chaque champ.
  // - handleChange : Fonction pour mettre à jour les valeurs lorsque l'utilisateur saisit des informations.
  const { values, errors, handleChange, setValues, setErrors } = useForm(initialEmployeeData);

  // État pour contrôler l'affichage du modal de confirmation après la création réussie d'un employé.
  const [isModalOpen, setModalOpen] = useState(false);

  // Fonction utilitaire pour formater les dates en format 'jour/mois/année'.
  // Cela garantit que les dates sont affichées de manière cohérente dans l'interface.
  const formatDateToDDMMYYYY = (date) => {
    if (!date) return null;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Le mois est indexé à partir de 0.
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Gestionnaire de changement de date, utilisé pour mettre à jour les champs de dates du formulaire.
  // - key : Correspond au champ de date à mettre à jour (dateOfBirth ou startDate).
  // - date : Nouvelle valeur de date sélectionnée par l'utilisateur.
  const handleDateChange = (key, date) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: date,
    }));
  };

  // Gestionnaire de sélection d'état (state) dans le formulaire.
  // - selectedState : Objet représentant l'état sélectionné dans la liste des options.
  const handleStateSelect = (selectedState) => {
    setValues((prevValues) => ({
      ...prevValues,
      state: selectedState.abbreviation,
    }));
  };

  // Fonction appelée lors de la tentative de sauvegarde du formulaire.
  // - Valide les données du formulaire et les enregistre dans le localStorage si elles sont valides.
  const handleSave = () => {
    // Validation des données du formulaire. Si des erreurs existent, elles sont stockées dans l'état 'errors'.
    const validationErrors = validateForm(values);

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // Si des erreurs sont présentes, on arrête la soumission.
    }

    // Formatage des dates avant l'enregistrement pour garantir un affichage uniforme.
    const formattedEmployeeData = {
        ...values,
        dateOfBirth: formatDateToDDMMYYYY(values.dateOfBirth),
        startDate: formatDateToDDMMYYYY(values.startDate),
    };

    // Récupération des employés existants dans le localStorage et ajout du nouvel employé.
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(formattedEmployeeData);
    
    // Sauvegarde de la nouvelle liste des employés dans le localStorage.
    localStorage.setItem('employees', JSON.stringify(employees));

    console.log('Employee Data Saved:', formattedEmployeeData);

    // Affichage du modal de confirmation.
    setModalOpen(true);
    // Réinitialisation des erreurs après soumission réussie.
    setErrors({});
  };

  // Rendu du formulaire de création d'employé.
  return (
    <form className="form">
      {/* Champ de saisie pour le prénom (firstName). Gestion des erreurs associées au champ. */}
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={values.firstName}
        onChange={handleChange}
        className={errors.firstName ? 'error' : ''}
      />
      {errors.firstName && <span className="error">{errors.firstName}</span>}

      {/* Champ de saisie pour le nom (lastName). Gestion des erreurs associées au champ. */}
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={values.lastName}
        onChange={handleChange}
        className={errors.lastName ? 'error' : ''}
      />
      {errors.lastName && <span className="error">{errors.lastName}</span>}

      {/* Sélecteur de date pour la date de naissance (dateOfBirth). Chargé dynamiquement avec React.Suspense. */}
      <label htmlFor="dateOfBirth">Date of Birth</label>
      <Suspense fallback={<div>Loading...</div>}>
        <DatePicker
          id="dateOfBirth"
          selectedDate={values.dateOfBirth}
          onChange={(date) => handleDateChange('dateOfBirth', date)}
        />
      </Suspense>

      {/* Sélecteur de date pour la date de début d'emploi (startDate). Chargé dynamiquement avec React.Suspense. */}
      <label htmlFor="startDate">Start Date</label>
      <Suspense fallback={<div>Loading...</div>}>
        <DatePicker
          id="startDate"
          selectedDate={values.startDate}
          onChange={(date) => handleDateChange('startDate', date)}
        />
      </Suspense>

      {/* Groupe de champs pour l'adresse, incluant la rue, la ville et le code postal. */}
      <fieldset className="address">
        <legend>Address</legend>

        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          id="street"
          value={values.street}
          onChange={handleChange}
          className={errors.street ? 'error' : ''}
        />
        {errors.street && <span className="error">{errors.street}</span>}

        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          value={values.city}
          onChange={handleChange}
          className={errors.city ? 'error' : ''}
        />
        {errors.city && <span className="error">{errors.city}</span>}

        {/* Sélecteur d'état via AutoComplete, permettant de choisir l'état de l'adresse. */}
        <AutoComplete options={states} onSelect={handleStateSelect} />

        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="number"
          name="zipCode"
          id="zipCode"
          value={values.zipCode}
          onChange={handleChange}
          className={errors.zipCode ? 'error' : ''}
        />
        {errors.zipCode && <span className="error">{errors.zipCode}</span>}
      </fieldset>

      {/* Sélection du département (department) avec une liste déroulante. */}
      <label htmlFor="department">Department</label>
      <select id="department" name="department" onChange={handleChange}>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="Engineering">Engineering</option>
        <option value="Human Resources">Human Resources</option>
        <option value="Legal">Legal</option>
      </select>

      {/* Bouton pour sauvegarder les données du formulaire. Appel de la fonction handleSave lors du clic. */}
      <button className="save" type="button" onClick={handleSave}>
        Save
      </button>

      {/* Affichage du modal de confirmation après création de l'employé, chargé dynamiquement via React.Suspense. */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        Employee Created!
      </Modal>
    </form>
  );
};

// Exportation du composant pour utilisation dans d'autres parties de l'application (par exemple, dans la page de création d'employé).
export default EmployeeForm;