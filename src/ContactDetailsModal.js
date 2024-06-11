import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, where, getDocs, updateDoc, arrayUnion, arrayRemove, doc } from 'firebase/firestore';
import './ContactDetailsModal.css';

const ContactDetailsModal = ({ contact, onClose }) => {
  const employeeID = sessionStorage.getItem('employeeID');
  const [isFavorite, setIsFavorite] = useState(false);
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const employeesRef = collection(db, 'employees');
      const q = query(employeesRef, where('EmployeeID', '==', employeeID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setDocId(doc.id);
          if (userData.favorites && userData.favorites.includes(contact.EmployeeID)) {
            setIsFavorite(true);
          }
        });
      }
    };

    checkFavoriteStatus();
  }, [employeeID, contact.EmployeeID]);

  const handleFavoriteToggle = async () => {
    if (docId) {
      const userRef = doc(db, 'employees', docId);

      if (isFavorite) {
        await updateDoc(userRef, {
          favorites: arrayRemove(contact.EmployeeID),
        });
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(contact.EmployeeID),
        });
      }

      setIsFavorite(!isFavorite);
    }
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
          <button className="favorite-button" onClick={handleFavoriteToggle}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsModal;
