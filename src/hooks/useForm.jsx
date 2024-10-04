import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return {
    values,
    errors,
    handleChange,
    setValues,  // Ajoutez ceci pour pouvoir utiliser setValues dans le formulaire
    setErrors,
  };
};

export default useForm;



// import { useState } from 'react';

// const useForm = (initialValues) => {
//   const [values, setValues] = useState(initialValues);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setValues({ ...values, [id]: value });
//   };

//   return {
//     values,
//     errors,
//     handleChange,
//     setErrors,
//   };
// };

// export default useForm; // Assurez-vous que l'export par défaut est présent