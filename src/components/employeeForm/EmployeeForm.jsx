import { useState } from "react";
import AutoComplete from "../autoComplete/AutoComplete";
import DatePicker from "../datePicker/DatePicker";
import { states } from "../../data/states";
import Modal from "../modal/Modal";

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
    // Formatage des dates avant d'enregistrer les données
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
  };

  return (
    <form className="form">
      <label htmlFor="first-name">First Name</label>
      <input type="text" id="firstName" onChange={handleInputChange} />

      <label htmlFor="last-name">Last Name</label>
      <input type="text" id="lastName" onChange={handleInputChange} />

      <label htmlFor="date-of-birth">Date of Birth</label>
      <DatePicker
        selectedDate={employeeData.dateOfBirth}
        onChange={(date) => handleDateChange('dateOfBirth', date)}
      />

      <label htmlFor="start-date">Start Date</label>
      <DatePicker
        selectedDate={employeeData.startDate}
        onChange={(date) => handleDateChange('startDate', date)}
      />

      <fieldset className="address">
        <legend>Address</legend>

        <label htmlFor="street">Street</label>
        <input type="text" id="street" onChange={handleInputChange} />

        <label htmlFor="city">City</label>
        <input type="text" id="city" onChange={handleInputChange} />

        <AutoComplete options={states} onSelect={handleStateSelect} />

        <label htmlFor="zip-code">Zip Code</label>
        <input type="number" id="zipCode" onChange={handleInputChange} />
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