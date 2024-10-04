import { useState } from "react";
import AutoComplete from "../autoComplete/AutoComplete";
import DatePicker from "../datePicker/DatePicker";
import { states } from "../../data/states";
import Modal from "../modal/Modal";
import { validateForm } from "../../utils/validation"; // Import de la validation

import './employeeForm.scss'

const EmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    street: '',
    city: '',
    state: states[0].abbreviation, // État par défaut : Alabama
    zipCode: '',
    department: '',
  });

  const [errors, setErrors] = useState({}); // Ajout d'un state pour les erreurs
  const [isModalOpen, setModalOpen] = useState(false);

  // Fonction pour formater les dates au format jour/mois/année
  const formatDateToDDMMYYYY = (date) => {
    if (!date) return null;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois commence à 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDateChange = (key, date) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      [key]: date,
    }));
  };

  const handleStateSelect = (selectedState) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      state: selectedState.abbreviation,
    }));
  };

  const handleSave = () => {
    // Validation des données avant de les sauvegarder
    const validationErrors = validateForm(employeeData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Si erreurs, on les stocke dans le state
      return;
    }

    // Si pas d'erreurs, formatage des dates avant d'enregistrer les données
    const formattedEmployeeData = {
      ...employeeData,
      dateOfBirth: formatDateToDDMMYYYY(employeeData.dateOfBirth),
      startDate: formatDateToDDMMYYYY(employeeData.startDate),
    };

    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(formattedEmployeeData);
    localStorage.setItem('employees', JSON.stringify(employees));

    console.log('Employee Data Saved:', formattedEmployeeData); // Vérification des données enregistrées

    setModalOpen(true);
    setErrors({}); // Réinitialiser les erreurs si le formulaire est valide
  };

  return (
    <form className="form">
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        onChange={handleInputChange}
        className={errors.firstName ? 'error' : ''} // Ajout d'une classe en cas d'erreur
      />
      {errors.firstName && <span className="error">{errors.firstName}</span>} {/* Message d'erreur avec la classe "error" */}

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        onChange={handleInputChange}
        className={errors.lastName ? 'error' : ''} // Ajout d'une classe en cas d'erreur
      />
      {errors.lastName && <span className="error">{errors.lastName}</span>} {/* Message d'erreur avec la classe "error" */}

      <label htmlFor="dateOfBirth">Date of Birth</label>
      <DatePicker
        id="dateOfBirth"
        selectedDate={employeeData.dateOfBirth}
        onChange={(date) => handleDateChange('dateOfBirth', date)}
      />

      <label htmlFor="startDate">Start Date</label>
      <DatePicker
        id="startDate"
        selectedDate={employeeData.startDate}
        onChange={(date) => handleDateChange('startDate', date)}
      />

      <fieldset className="address">
        <legend>Address</legend>

        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={handleInputChange}
          className={errors.street ? 'error' : ''}
        />
        {errors.street && <span className="error">{errors.street}</span>} {/* Message d'erreur avec la classe "error" */}

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={handleInputChange}
          className={errors.city ? 'error' : ''}
        />
        {errors.city && <span className="error">{errors.city}</span>} {/* Message d'erreur avec la classe "error" */}

        <AutoComplete options={states} onSelect={handleStateSelect} />

        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="number"
          id="zipCode"
          onChange={handleInputChange}
          className={errors.zipCode ? 'error' : ''}
        />
        {errors.zipCode && <span className="error">{errors.zipCode}</span>} {/* Message d'erreur avec la classe "error" */}
      </fieldset>

      <label htmlFor="department">Department</label>
      <select id="department" onChange={handleInputChange}>
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


// import { useState } from "react";
// import AutoComplete from "../autoComplete/AutoComplete";
// import DatePicker from "../datePicker/DatePicker";
// import { states } from "../../data/states";
// import { validateForm } from "../../utils/validation";
// import Modal from "../modal/Modal";

// import './employeeForm.scss'

// const EmployeeForm = () => {
//   const [employeeData, setEmployeeData] = useState({
//     firstName: '',
//     lastName: '',
//     dateOfBirth: null,
//     startDate: null,
//     street: '',
//     city: '',
//     state: states[0].abbreviation, // État par défaut : Alabama
//     zipCode: '',
//     department: '',
//   });

//   const [errors, setErrors] = useState({}); // Ajout d'un state pour les erreurs
//   const [isModalOpen, setModalOpen] = useState(false);

//   // Fonction pour formater les dates au format jour/mois/année
//   const formatDateToDDMMYYYY = (date) => {
//     if (!date) return null;
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois commence à 0
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setEmployeeData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleDateChange = (key, date) => {
//     setEmployeeData((prevData) => ({
//       ...prevData,
//       [key]: date,
//     }));
//   };

//   const handleStateSelect = (selectedState) => {
//     setEmployeeData((prevData) => ({
//       ...prevData,
//       state: selectedState.abbreviation,
//     }));
//   };

//   const handleSave = () => {
//     // Formatage des dates avant d'enregistrer les données
//     const formattedEmployeeData = {
//       ...employeeData,
//       dateOfBirth: formatDateToDDMMYYYY(employeeData.dateOfBirth),
//       startDate: formatDateToDDMMYYYY(employeeData.startDate),
//     };

//     const employees = JSON.parse(localStorage.getItem('employees')) || [];
//     employees.push(formattedEmployeeData);
//     localStorage.setItem('employees', JSON.stringify(employees));

//     console.log('Employee Data Saved:', formattedEmployeeData); // Vérification des données enregistrées

//     setModalOpen(true);
//   };

//   return (
//     <form className="form">
//       <label htmlFor="firstName">First Name</label>
//       <input type="text" id="firstName" onChange={handleInputChange} />

//       <label htmlFor="lastName">Last Name</label>
//       <input type="text" id="lastName" onChange={handleInputChange} />

//       <label htmlFor="dateOfBirth">Date of Birth</label>
//       <DatePicker
//         id="dateOfBirth"
//         selectedDate={employeeData.dateOfBirth}
//         onChange={(date) => handleDateChange('dateOfBirth', date)}
//       />

//       <label htmlFor="startDate">Start Date</label>
//       <DatePicker
//         id="startDate"
//         selectedDate={employeeData.startDate}
//         onChange={(date) => handleDateChange('startDate', date)}
//       />

//       <fieldset className="address">
//         <legend>Address</legend>

//         <label htmlFor="street">Street</label>
//         <input type="text" id="street" onChange={handleInputChange} />

//         <label htmlFor="city">City</label>
//         <input type="text" id="city" onChange={handleInputChange} />

//         <AutoComplete options={states} onSelect={handleStateSelect} />

//         <label htmlFor="zipCode">Zip Code</label>
//         <input type="number" id="zipCode" onChange={handleInputChange} />
//       </fieldset>

//       <label htmlFor="department">Department</label>
//       <select id="department" onChange={handleInputChange}>
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