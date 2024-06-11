
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, query, where, arrayContains, updateDoc } from 'firebase/firestore';
import './PersonalizedPage.css';
import Card from './Card';
import ContactDetailsModal from './ContactDetailsModal';

const PersonalizedPage = () => {
  const [favoriteContacts, setFavoriteContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const employeeID = sessionStorage.getItem('employeeID');

  useEffect(() => {
    const fetchFavoriteContacts = async () => {
      try {
        const employeesRef = collection(db, 'employees');
        const querySnapshot = await getDocs(employeesRef);
        const currentUserDoc = querySnapshot.docs.find(doc => doc.data().EmployeeID === employeeID);

        if (!currentUserDoc) {
          console.log('User document not found');
          return;
        }

        const favorites = currentUserDoc.data().favorites || [];

        if (favorites.length === 0) {
          console.log('No favorite contacts found');
          return;
        }

        const favoriteContacts = [];
        for (const favoriteID of favorites) {
          const favoriteDoc = await getDocs(query(employeesRef, where('EmployeeID', '==', favoriteID)));
          
          if (!favoriteDoc.empty) {
            const favoriteData = favoriteDoc.docs[0].data();
            const favoriteContact = {
              EmployeeID: favoriteData.EmployeeID,
              EmployeeName: favoriteData.EmployeeName,
              EmployeeRole: favoriteData.EmployeeRole,
              EmployeeDepartment: favoriteData.EmployeeDepartment
            };
            favoriteContacts.push(favoriteContact);
          }
        }
        
        setFavoriteContacts(favoriteContacts);
      } catch (error) {
        console.error('Error fetching favorite contacts:', error);
      }
    };

    fetchFavoriteContacts();
  }, [employeeID]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
  };

  const handleRemoveFavorite = async (removedContactID) => {
    
    const employeesRef = collection(db, 'employees');
    const userQuerySnapshot = await getDocs(query(employeesRef, where('EmployeeID', '==', employeeID)));

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const currentFavorites = userDoc.data().favorites || [];
      const updatedFavorites = currentFavorites.filter(id => id !== removedContactID);
      
      await updateDoc(userDoc.ref, { favorites: updatedFavorites });
      
      
      const updatedFavoriteContacts = favoriteContacts.filter(contact => contact.EmployeeID !== removedContactID);
      setFavoriteContacts(updatedFavoriteContacts);
    }
  };

  return (
    <div className="personalized-page">
      <h2>Favorite Contacts</h2>
      <div className="contact-list">
        {favoriteContacts.map(contact => (
          <Card key={contact.EmployeeID} contact={contact} onClick={() => handleContactClick(contact)} />
        ))}
      </div>
      {selectedContact && (
        <ContactDetailsModal contact={selectedContact} onClose={handleCloseModal} onRemoveFavorite={handleRemoveFavorite} />
      )}
    </div>
  );
};

export default PersonalizedPage;
