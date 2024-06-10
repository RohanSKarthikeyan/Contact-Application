import React from 'react';
import './ContactDetailsModal.css'; 

const ContactDetailsModal = ({ contact, onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
          <h2>Contact Details</h2>
          <p><strong>Employee ID:</strong> {contact.EmployeeID}</p>
          <p><strong>Employee Name:</strong> {contact.EmployeeName}</p>
          <p><strong>Employee Role:</strong> {contact.EmployeeRole}</p>
          <p><strong>Employee Mobile:</strong> {contact.EmployeeMobile}</p>
          <p><strong>Employee Address:</strong> {contact.EmployeeAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsModal;
