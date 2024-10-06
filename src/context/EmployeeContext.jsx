import { createContext, useContext, useState } from 'react';

// Crée le contexte des employés
const EmployeeContext = createContext();

// Fournisseur de contexte pour envelopper l'application
export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);  // Stockage dans un état local au contexte

    const addEmployee = (newEmployee) => {
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

// Hook pour accéder facilement aux employés et à l'ajout d'employés
export const useEmployee = () => useContext(EmployeeContext);
