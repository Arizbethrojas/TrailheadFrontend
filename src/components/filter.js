// Filter.js
import React from 'react';

const Filter = ({ filterBySubclub, setFilterBySubclub, filterBySignUp, setFilterBySignUp }) => {

  const handleSubclubChange = (event) => {
    setFilterBySubclub(event.target.value);
  };

  const toggleSignUpFilter = () => {
    setFilterBySignUp(!filterBySignUp);
  };

  return (
    <div className="filters-container">
      <div className="filters">
        <label>
          Outdoor subclub:
          <select value={filterBySubclub} onChange={handleSubclubChange}>
            <option value="">All</option>
            <option value="Hiking">Hiking</option>
            <option value="Biking">Biking</option>
            <option value="Climbing">Climbing</option>
            <option value="VHOC">VHOC</option>
          </select>
        </label>
        <label>
          <input type="checkbox" checked={filterBySignUp} onChange={toggleSignUpFilter} />
          My trips
        </label>
      </div>
    </div>
  );
};

export default Filter;
