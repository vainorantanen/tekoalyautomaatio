import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "./Options/Options";
import ChatBotLink from "./Register/ChatBotLink";

const config = {
  botName: "Chatbot",
  initialMessages: [
    createChatBotMessage(`Moi! Tervetuloa Tekoalyautomaatioon! Mitä haluat tehdä?`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "register",
      widgetFunc: (props) => <ChatBotLink {...props} linkRoute={'/login'} />
    },
    {
      widgetName: "seeFeed",
      widgetFunc: (props) => <ChatBotLink {...props} linkRoute={'/feed'} />
    },
    {
      widgetName: "forDevs",
      widgetFunc: (props) => <ChatBotLink {...props} linkRoute={'/yrityksille'} />
    },
    {
      widgetName: "requestQuote",
      widgetFunc: (props) => <ChatBotLink {...props} linkRoute={'/lisaailmoitus'} />
    }
  ],
};

export default config;