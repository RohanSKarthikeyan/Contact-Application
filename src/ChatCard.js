import React, { useState } from 'react';
import { format } from 'date-fns';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; 
import './ChatBot.css';
import bot from './images/Bot Icon.png';

const ChatBot = () => {
  const [showChat, setShowChat] = useState(true); 
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [numContacts, setNumContacts] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = getBotResponse(query.trim());
    console.log('Bot Response:', response);

    const newMessage = { text: query, sender: 'user' };
    setChatHistory([...chatHistory, newMessage]);

    if (response !== '') {
      const botResponse = { text: response, sender: 'bot' };
      setChatHistory([...chatHistory, botResponse]);
    }

    setQuery('');
  };

  const fetchNumberOfContacts = async () => {
    const contactsRef = collection(db, 'employees');
    const contactsSnapshot = await getDocs(contactsRef);
    const numContacts = contactsSnapshot.size;
    setNumContacts(numContacts);

    const botResponse = `The number of contacts is ${numContacts}.`;
    const botMessage = { text: botResponse, sender: 'bot' };
    setChatHistory([...chatHistory, botMessage]);
  };

  const getBotResponse = (query) => {
    if (query.toLowerCase().includes('hello') || query.toLowerCase().includes('hi')) {
      return 'Hello! How can I assist you?';
    } else if (query.toLowerCase().includes('bye') || query.toLowerCase().includes('goodbye') || query.toLowerCase().includes('Thank You')) {
      return 'Goodbye!';
    } else {
      return '';
    }
  };

  return (
    <div className="chat-bot">
      {showChat && (
        <div className="chat-interface">
          <div className="chat-history">
            {chatHistory.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
          <button className="fetch-contacts" onClick={fetchNumberOfContacts}>
            What's the number of contacts?
          </button>
          <button className="close-button" onClick={() => setShowChat(false)}>
            X
          </button>
        </div>
      )}
      <button className="chat-icon" onClick={() => setShowChat(true)}>
        <img src={bot} alt="Chat Icon" />
      </button>
    </div>
  );
};

export default ChatBot;
