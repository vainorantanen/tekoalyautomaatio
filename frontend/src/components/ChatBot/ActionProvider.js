class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    greet = () => {
      const message = this.createChatBotMessage("Moi, Tervetuloa Tekoalyautomaatioon!");
      this.addMessageToState(message);
    };
  
    handleJavascriptQuiz = () => {
      const message = this.createChatBotMessage(
        "Fantastic. Here is your quiz. Good luck!",
        {
          widget: "javascriptQuiz",
        }
      );
  
      this.addMessageToState(message);
    };

    handleRegister = () => {
        const message = this.createChatBotMessage("Haluatko rekisteröityä sivustolle ja luoda profiilin? (Kyllä/Ei)");
        this.addMessageToState(message);
      };
    
      handleNewProject = () => {
        const message = this.createChatBotMessage("Haluatko luoda uuden tekoälyprojektin? (Kyllä/Ei)");
        this.addMessageToState(message);
      };
    
      handleQuoteRequest = () => {
        const message = this.createChatBotMessage("Haluatko jättää tarjouspyynnön tekoälyyrityksille? (Kyllä/Ei)");
        this.addMessageToState(message);
      };
  
    addMessageToState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    };
  }
  
  export default ActionProvider;