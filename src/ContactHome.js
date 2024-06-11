import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './ContactHome.css';
import Card from './Card';
import ContactDetailsModal from './ContactDetailsModal';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

const ContactHome = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({ filterType: '', filterValue: '', sortOrder: 'asc' });

  useEffect(() => {
    const fetchContacts = async () => {
      const q = query(collection(db, 'employees'), orderBy('EmployeeID'));
      const querySnapshot = await getDocs(q);
      const contactsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setContacts(contactsData);
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let updatedContacts = contacts.slice();

      if (filter.filterType && filter.filterValue) {
        updatedContacts = updatedContacts.filter(contact =>
          contact[filter.filterType] && contact[filter.filterType].toLowerCase() === filter.filterValue.toLowerCase()
        );
      }

      if (filter.sortOrder === 'asc') {
        updatedContacts.sort((a, b) => a.EmployeeID - b.EmployeeID);
      } else {
        updatedContacts.sort((a, b) => b.EmployeeID - a.EmployeeID);
      }

      setFilteredContacts(updatedContacts);
    };

    applyFilters();
  }, [contacts, filter]);

  useEffect(() => {
    const searchContacts = () => {
      let updatedContacts = contacts;
  
      if (searchTerm) {
      
        updatedContacts = updatedContacts.filter(contact =>
          (contact.EmployeeName && contact.EmployeeName.toLowerCase().startsWith(searchTerm.toLowerCase())) ||
          (contact.EmployeeID && contact.EmployeeID.startsWith(searchTerm))
        );
      }
  
      setFilteredContacts(updatedContacts);
    };
  
    searchContacts();
  }, [contacts, searchTerm]);
  

  const handleCardClick = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
    setIsModalOpen(false);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const clearFilters = () => {
    setFilter({ filterType: '', filterValue: '', sortOrder: 'asc' });
    setSearchTerm('');
  };

  return (
    <div className="contact-home">
      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <FilterBar onFilter={handleFilterChange} onClearFiltersClick={clearFilters} />
      <div className="contact-list">
        {filteredContacts.map(contact => (
          <Card
            key={contact.id}
            contact={contact}
            onClick={() => handleCardClick(contact)}
            isSelected={selectedContact && selectedContact.id === contact.id}
          />
        ))}
      </div>
      {isModalOpen && <ContactDetailsModal contact={selectedContact} onClose={handleCloseModal} />}
    </div>
  );
};

export default ContactHome;