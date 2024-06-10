import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Adjust the path according to your project structure
import { collection, getDocs, query, orderBy, startAfter, limit } from 'firebase/firestore'; // Import necessary functions
import './ContactHome.css'; // Add styling for the contact home
import Card from './Card';
import ContactDetailsModal from './ContactDetailsModal';
import SearchBar from './SearchBar'; // Import the SearchBar component

const ContactHome = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track if modal is open

  useEffect(() => {
    const fetchContacts = async () => {
      const q = query(collection(db, 'employees'), orderBy('EmployeeID')); // Use 'orderBy' function correctly
      const querySnapshot = await getDocs(q);
      const newContacts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setContacts(newContacts);
    };
  
    fetchContacts();
  }, []);
  
  useEffect(() => {
    setFilteredContacts(
      contacts.filter(contact =>
        contact.EmployeeName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        contact.EmployeeID.startsWith(searchTerm)
      )
    );
  }, [searchTerm, contacts]);
  

  const handleCardClick = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true); // Open the modal when a contact card is clicked
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
    setIsModalOpen(false); // Close the modal when it is closed
  };

  return (
    <div className="contact-home">
      <SearchBar value={searchTerm} onChange={setSearchTerm} /> {/* Pass setSearchTerm as the onChange function */}
      <div className="contact-list">
        {filteredContacts.map(contact => (
          <Card key={contact.id} contact={contact} onClick={() => handleCardClick(contact)} />
        ))}
      </div>
      {isModalOpen && <ContactDetailsModal contact={selectedContact} onClose={handleCloseModal} />}
    </div>
  );
};

export default ContactHome;
