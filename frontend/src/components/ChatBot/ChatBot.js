// Chatbot.js
import React, { useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import workflowConfig from './workflowConfig';

const Chatbot = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    const currentStepConfig = workflowConfig.find((step) => step.id === currentStep);

    console.log(currentStepConfig);

    if (currentStepConfig) {
        console.log(typeof currentStepConfig.botResponse);
        console.log(currentStepConfig.botResponse);
        addResponseMessage(currentStepConfig.botResponse);
  
        if (currentStepConfig.userResponseKeywords) {
          const isYes = ['kyllä', 'kyllä kiitos', 'joo', 'kylläpä', 'jep', 'jepp', 'todellakin'].some(
            (yesKeyword) => newMessage.toLowerCase().includes(yesKeyword)
          );
  
          const isNo = ['ei', 'ei kiitos', 'ei todellakaan', 'ei ikinä'].some(
            (noKeyword) => newMessage.toLowerCase().includes(noKeyword)
          );
  
          if (isYes && currentStepConfig.nextStepYes) {
            console.log('Havaittu kyllä')
            setCurrentStep(currentStepConfig.nextStepYes);
          } else if (isNo && currentStepConfig.nextStepNo) {
            console.log('Havaittu ei')
            setCurrentStep(currentStepConfig.nextStepNo);
          } else {
            // Käsittelisi epäselviä vastauksia tässä
          }
        } else if (currentStepConfig.nextStep) {
          setCurrentStep(currentStepConfig.nextStep);
        }
      }
    };
  

  return (
    <div className="chatbot-container" style={{ color: 'black' }}>
      <Widget
        title="Chatbot"
        subtitle="Kysy mitä vaan!"
        handleNewUserMessage={handleNewUserMessage}
      />
    </div>
  );
};

export default Chatbot;
