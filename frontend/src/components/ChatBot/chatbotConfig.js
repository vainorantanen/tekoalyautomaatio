import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "./Options/Options";

const config = {
  botName: "Chatbot",
  initialMessages: [
    createChatBotMessage(`Hello. What do you want to learn`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
  ],
};

export default config;