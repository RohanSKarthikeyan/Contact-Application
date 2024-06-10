import React from 'react';
import './SearchBar.css'; // Add styling for the search bar

const SearchBar = ({ value, onChange }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value); // Call the onChange function with the updated search term
  };

  return (
    <input
      type="text"
      placeholder="Search by name or ID..."
      value={value}
      onChange={handleChange} // Call handleChange function when the input value changes
      className="search-bar"
    />
  );
};

export default SearchBar;
