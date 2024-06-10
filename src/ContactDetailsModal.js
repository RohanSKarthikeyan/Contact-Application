import React, { useState } from 'react';
import './ContactDetailsModal.css'; 

const ContactDetailsModal = ({ contact, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Add logic to add/remove contact from favorites in the database
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>X</button>
          <h2 className="card-title">Contact Details</h2>
          <p className="card-content"><strong>Employee ID:</strong> {contact.EmployeeID}</p>
          <p className="card-content"><strong>Employee Name:</strong> {contact.EmployeeName}</p>
          <p className="card-content"><strong>Employee Role:</strong> {contact.EmployeeRole}</p>
          <p className="card-content"><strong>Employee Mobile:</strong> {contact.EmployeeMobile}</p>
          <p className="card-content"><strong>Employee Address:</strong> {contact.EmployeeAddress}</p>
          <button className={`favorite-button ${isFavorite ? 'selected' : ''}`} onClick={handleFavoriteToggle}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsModal;
