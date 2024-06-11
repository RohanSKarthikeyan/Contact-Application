import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import './PersonalizedPage.css';
import Card from './Card';
import ContactDetailsModal from './ContactDetailsModal';

const PersonalizedPage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [favoriteContacts, setFavoriteContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();
  const employeeID = sessionStorage.getItem('employeeID');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const employeesRef = collection(db, 'employees');
        const querySnapshot = await getDocs(query(employeesRef, where('EmployeeID', '==', employeeID)));
        
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUserDetails(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

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

    fetchUserData();
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

  const handleLogout = () => {
    sessionStorage.removeItem('employeeID');
    navigate('/'); 
  };

  return (
    <div className="personalized-page">
      <div className="header">
        <div className="greeting">
          <h1>Hey, <span>{userDetails.EmployeeName}</span></h1>
          <p>Welcome to your personalized page</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="profile-card">
        <h2>{userDetails.EmployeeName}</h2>
        <p>{userDetails.EmployeeRole}</p>
        <p>ID: {userDetails.EmployeeID}</p>
        <p>Department: {userDetails.EmployeeDepartment}</p>
        <p>Age: {userDetails.EmployeeAge}</p>
        <p>Address: {userDetails.EmployeeAddress}</p>
        <p>Mobile: {userDetails.EmployeeMobile}</p>
      </div>
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
