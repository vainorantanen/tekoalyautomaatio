import React from "react";

import "./options.css";

const Options = (props) => {
  const options = [
    {
      text: "Kirjaudu/Rekisteröidy",
      handler: props.actionProvider.handleRegister,
      id: 1,
    },
    { text: "Kehittäjille",
    handler: props.actionProvider.handleNewProjectAsDev,
     id: 2 },
    { text: "Jätä tarjouspyyntö",
    handler: props.actionProvider.handleQuoteRequest,
    id: 3 },
    { text: "Katso feedia",
    handler: props.actionProvider.handleSeeFeed,
    id: 4 }
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;