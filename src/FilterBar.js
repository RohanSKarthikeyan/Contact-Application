import React, { useState } from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilter, onClearFiltersClick }) => {
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const applyFilter = () => {
    onFilter({ filterType, filterValue, sortOrder });
  };

  const clearFilters = () => {
    setFilterType('');
    setFilterValue('');
    setSortOrder('asc');
    onClearFiltersClick(); 
  };

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        <div className="filter-dropdown">
          <select value={filterType} onChange={handleFilterTypeChange}>
            <option value="">Select Filter Type</option>
            <option value="EmployeeRole">Role</option>
            <option value="EmployeeName">Name</option>
          </select>
        </div>

        {filterType === 'EmployeeRole' && (
          <div className="filter-dropdown">
            <select value={filterValue} onChange={handleFilterValueChange}>
              <option value="">Select Role</option>
              <option value="Senior Lead">Senior Lead</option>
              <option value="Project Intern">Project Intern</option>
              <option value="FTE">Full Time Employee</option>
            </select>
          </div>
        )}

        <div className="sort-order">
          <label>
            <input
              type="radio"
              value="asc"
              checked={sortOrder === 'asc'}
              onChange={handleSortOrderChange}
            />
            Ascending
          </label>
          <label>
            <input
              type="radio"
              value="desc"
              checked={sortOrder === 'desc'}
              onChange={handleSortOrderChange}
            />
            Descending
          </label>
        </div>

        <button onClick={applyFilter}>Apply Filter</button>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>
    </div>
  );
};

export default FilterBar;
