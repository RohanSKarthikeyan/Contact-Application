// UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(); 

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const updateUserDetails = () => {
 
  };

  return (
    <UserContext.Provider value={{ user, updateUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};


const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser, UserContext }; 
