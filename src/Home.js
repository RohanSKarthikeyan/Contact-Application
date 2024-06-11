import React, { useState, useEffect } from 'react';
import './Home.css';
import TopSpace from './TopSpace';
import ContactHome from './ContactHome';
import ChatCard from './ChatCard';

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
   
    setIsVisible(true);
  }, []);

  return (
    <div className={`home-container ${isVisible ? 'visible' : ''}`}>
      <TopSpace />
      <ContactHome />
     <ChatCard />
    </div>
  );
};

export default Home;
