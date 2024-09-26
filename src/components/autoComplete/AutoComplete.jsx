import { useState, useEffect } from 'react';

const AutoComplete = ({ options, onSelect }) => {
  const [selectedState, setSelectedState] = useState(options[0].abbreviation); // Affichage par défaut

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedState(selectedValue);
    const selectedOption = options.find(option => option.abbreviation === selectedValue);
    onSelect(selectedOption);
  };

  return (
    <div>
      <label htmlFor="state">State</label>
      <select id="state" value={selectedState} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.abbreviation} value={option.abbreviation}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AutoComplete;
