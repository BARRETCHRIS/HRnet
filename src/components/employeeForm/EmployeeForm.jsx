import React, { useState, lazy, Suspense, useEffect } from "react";
import { states } from "../../data/states";
import { validateForm } from "../../utils/validation";
import useForm from "../../hooks/useForm"; // Assurez-vous d'importer le hook

import './employeeForm.scss';

const AutoComplete = lazy(() => import("../autoComplete/AutoComplete"));
const DatePicker = lazy(() => import("../datePicker/DatePicker"));
const Modal = lazy(() => import("../modal/Modal"));

const EmployeeForm = () => {
  const initialEmployeeData = {
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    street: '',
    city: '',
    state: states[0].abbreviation, // État par défaut : Alabama
    zipCode: '',
    department: '',
  };

  // Utilisation de useForm pour gérer les données du formulaire et les erreurs
  const { values, errors, handleChange, setValues, setErrors } = useForm(initialEmployeeData); // Assurez-vous d'importer setValues
  const [isModalOpen, setModalOpen] = useState(false);

   // Fonction pour formater les dates au format jour/mois/année
  const formatDateToDDMMYYYY = (date) => {
    if (!date) return null;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois commence à 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (key, date) => {
    // Mettez à jour le champ de date dans les valeurs
    setValues((prevValues) => ({
      ...prevValues,
      [key]: date,
    }));
  };

  const handleStateSelect = (selectedState) => {
    // Mettez à jour l'état dans les valeurs
    setValues((prevValues) => ({
      ...prevValues,
      state: selectedState.abbreviation,
    }));
  };

  const handleSave = () => {
    const validationErrors = validateForm(values);

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    const formattedEmployeeData = {
        ...values,
        dateOfBirth: formatDateToDDMMYYYY(values.dateOfBirth),
        startDate: formatDateToDDMMYYYY(values.startDate),
    };

    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(formattedEmployeeData);
    
    // Écrire les données dans localStorage
    localStorage.setItem('employees', JSON.stringify(employees));

    console.log('Employee Data Saved:', formattedEmployeeData);
    setModalOpen(true);
    setErrors({});
  };

  return (
    <form className="form">
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName" // Assurez-vous que le nom correspond au champ
        id="firstName"
        value={values.firstName}
        onChange={handleChange}
        className={errors.firstName ? 'error' : ''}
      />
      {errors.firstName && <span className="error">{errors.firstName}</span>}

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName" // Assurez-vous que le nom correspond au champ
        id="lastName"
        value={values.lastName}
        onChange={handleChange}
        className={errors.lastName ? 'error' : ''}
      />
      {errors.lastName && <span className="error">{errors.lastName}</span>}

      <label htmlFor="dateOfBirth">Date of Birth</label>
      <Suspense fallback={<div>Loading...</div>}>
        <DatePicker
          id="dateOfBirth"
          selectedDate={values.dateOfBirth}
          onChange={(date) => handleDateChange('dateOfBirth', date)}
        />
      </Suspense>

      <label htmlFor="startDate">Start Date</label>
      <Suspense fallback={<div>Loading...</div>}>
        <DatePicker
          id="startDate"
          selectedDate={values.startDate}
          onChange={(date) => handleDateChange('startDate', date)}
        />
      </Suspense>

      <fieldset className="address">
        <legend>Address</legend>

        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street" // Assurez-vous que le nom correspond au champ
          id="street"
          value={values.street}
          onChange={handleChange}
          className={errors.street ? 'error' : ''}
        />
        {errors.street && <span className="error">{errors.street}</span>}

        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city" // Assurez-vous que le nom correspond au champ
          id="city"
          value={values.city}
          onChange={handleChange}
          className={errors.city ? 'error' : ''}
        />
        {errors.city && <span className="error">{errors.city}</span>}

        <AutoComplete options={states} onSelect={handleStateSelect} />

        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="number"
          name="zipCode" // Assurez-vous que le nom correspond au champ
          id="zipCode"
          value={values.zipCode}
          onChange={handleChange}
          className={errors.zipCode ? 'error' : ''}
        />
        {errors.zipCode && <span className="error">{errors.zipCode}</span>}
      </fieldset>

      <label htmlFor="department">Department</label>
      <select id="department" name="department" onChange={handleChange}>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="Engineering">Engineering</option>
        <option value="Human Resources">Human Resources</option>
        <option value="Legal">Legal</option>
      </select>

      <button className="save" type="button" onClick={handleSave}>
        Save
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        Employee Created!
      </Modal>
    </form>
  );
};

export default EmployeeForm;

// import React, { useState, lazy, Suspense } from "react";
// import { states } from "../../data/states";
// // import Modal from "../modal/Modal";
// import { validateForm } from "../../utils/validation";
// import useForm from "../../hooks/useForm"; // Assurez-vous d'importer le hook

// import './employeeForm.scss';

// const AutoComplete = lazy(() => import("../autoComplete/AutoComplete"));
// const DatePicker = lazy(() => import("../datePicker/DatePicker"));
// const Modal = lazy(() => import("../modal/Modal"));

// const EmployeeForm = () => {
//   const initialEmployeeData = {
//     firstName: '',
//     lastName: '',
//     dateOfBirth: null,
//     startDate: null,
//     street: '',
//     city: '',
//     state: states[0].abbreviation, // État par défaut : Alabama
//     zipCode: '',
//     department: '',
//   };

//   // Utilisation de useForm pour gérer les données du formulaire et les erreurs
//   const { values, errors, handleChange, setValues, setErrors } = useForm(initialEmployeeData); // Assurez-vous d'importer setValues
//   const [isModalOpen, setModalOpen] = useState(false);

//   // Fonction pour formater les dates au format jour/mois/année
//   const formatDateToDDMMYYYY = (date) => {
//     if (!date) return null;
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois commence à 0
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleDateChange = (key, date) => {
//     // Mettez à jour le champ de date dans les valeurs
//     setValues((prevValues) => ({
//       ...prevValues,
//       [key]: date,
//     }));
//   };

//   const handleStateSelect = (selectedState) => {
//     // Mettez à jour l'état dans les valeurs
//     setValues((prevValues) => ({
//       ...prevValues,
//       state: selectedState.abbreviation,
//     }));
//   };

//   const handleSave = () => {
//     // Validation des données avant de les sauvegarder
//     const validationErrors = validateForm(values);

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors); // Si erreurs, on les stocke dans le state
//       return;
//     }

//     // Si pas d'erreurs, formatage des dates avant d'enregistrer les données
//     const formattedEmployeeData = {
//       ...values,
//       dateOfBirth: formatDateToDDMMYYYY(values.dateOfBirth),
//       startDate: formatDateToDDMMYYYY(values.startDate),
//     };

//     const employees = JSON.parse(localStorage.getItem('employees')) || [];
//     employees.push(formattedEmployeeData);
//     localStorage.setItem('employees', JSON.stringify(employees));

//     console.log('Employee Data Saved:', formattedEmployeeData); // Vérification des données enregistrées

//     setModalOpen(true);
//     setErrors({}); // Réinitialiser les erreurs si le formulaire est valide
//   };

//   return (
//     <form className="form">
//       <label htmlFor="firstName">First Name</label>
//       <input
//         type="text"
//         name="firstName" // Assurez-vous que le nom correspond au champ
//         id="firstName"
//         value={values.firstName}
//         onChange={handleChange}
//         className={errors.firstName ? 'error' : ''}
//       />
//       {errors.firstName && <span className="error">{errors.firstName}</span>}

//       <label htmlFor="lastName">Last Name</label>
//       <input
//         type="text"
//         name="lastName" // Assurez-vous que le nom correspond au champ
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
//           name="street" // Assurez-vous que le nom correspond au champ
//           id="street"
//           value={values.street}
//           onChange={handleChange}
//           className={errors.street ? 'error' : ''}
//         />
//         {errors.street && <span className="error">{errors.street}</span>}

//         <label htmlFor="city">City</label>
//         <input
//           type="text"
//           name="city" // Assurez-vous que le nom correspond au champ
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
//           name="zipCode" // Assurez-vous que le nom correspond au champ
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