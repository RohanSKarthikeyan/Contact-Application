import React from 'react';
import './SearchBar.css'; 

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search contacts..."
      value={value}
      onChange={onChange}
      className="search-bar"
    />
  );
};

export default SearchBar;
