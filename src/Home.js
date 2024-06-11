import React, { useState } from 'react';
import './Home.css';
import TopSpace from './TopSpace';
import ContactHome from './ContactHome';
import ChatCard from './ChatCard'; 

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <TopSpace />
      <ContactHome />
      <div className="chat-icon" onClick={toggleChat}>
        <img src="chat-icon.png" alt="Chat" />
      </div>
      {isChatOpen && <ChatCard />}
    </div>
  );
};

export default Home;
