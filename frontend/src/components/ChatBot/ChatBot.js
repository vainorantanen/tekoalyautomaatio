import React from 'react';
import { Chatbot } from "react-chatbot-kit";

import config from './chatbotConfig';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

import './chatbot.css'; 

const ChatbotComponent = () => {

  return (
    <div className="chatbot-container">
      <div className="chatbot-wrapper">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </div>
  );
};

export default ChatbotComponent;
