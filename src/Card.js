import React from 'react';
import './Card.css';
import personImage from './images/person.png';

const Card = ({ contact, onClick, isSelected, isFavorited }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick(contact);
  };

  const cardClassName = `card ${isSelected ? 'selected' : ''} ${isFavorited ? 'favorited' : ''}`;

  return (
    <div className={cardClassName} onClick={handleClick}>
      <div className="card-content">
        <div className="contact-top">
          <p className="contact-name">{contact.EmployeeName}</p>
        </div>
        <div className="contact-bottom">
          <p className="contact-id">{contact.EmployeeID}</p>
          <p className="contact-role">{contact.EmployeeRole}</p>
          <p className="contact-department">{contact.EmployeeDepartment}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;