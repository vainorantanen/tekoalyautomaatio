import React, { useState } from 'react';
import { Chatbot } from "react-chatbot-kit";

import config from './chatbotConfig';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

import './chatbot.css'; 
import { IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';


const ChatbotComponent = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="chatbot-container">
      {showChat && (
        <div className="chatbot-wrapper">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}

      <div style={{ 
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999
       }}>
        <IconButton onClick={toggleChat}>
          <ChatIcon sx={{ color: 'white', backgroundColor: 'blue',
        padding: '1rem', borderRadius: '0.5rem' }}/>
        </IconButton>
      </div>
    </div>
  );
};

export default ChatbotComponent;
