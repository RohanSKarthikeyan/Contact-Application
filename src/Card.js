import React from 'react';
import './Card.css'; 


const Card = ({ contact, onClick }) => {
  const handleClick = (event) => {
    event.preventDefault(); 
    onClick(contact);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-content">
          <div className="contact-icon"></div>
          <div className="contact-details">
            <p className="contact-id">Employee ID: {contact.EmployeeID}</p>
            <p className="contact-name">Employee Name: {contact.EmployeeName}</p>
          </div>
        </div>
    </div>
  );
};

export default Card;
