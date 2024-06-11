import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Home from './Home';
import PersonalizedPage from './PersonalizedPage';
import ContactDetailsModal from './ContactDetailsModal';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/personalized" element={<PersonalizedPage />} />
          <Route path="/contact-details" element={<ContactDetailsModal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
