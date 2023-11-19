class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    greet = () => {
      const message = this.createChatBotMessage("Moi, Tervetuloa Tekoalyautomaatioon!");
      this.addMessageToState(message);
    };


    handleRegister = () => {
      const message = this.createChatBotMessage('Haluatko rekisteröityä sivustolle ja luoda profiilin? Voit tehdä sen ', {
        widget: "register"
      });
      this.addMessageToState(message);
    };
    
      handleNewProjectAsDev = () => {
        const message = this.createChatBotMessage("Haluatko toteuttaa tekoälyprojekteja kehittäjänä? Voit tehdä sen", {
          widget: 'forDevs'
        });
        this.addMessageToState(message);
      };
    
      handleQuoteRequest = () => {
        const message = this.createChatBotMessage("Haluatko jättää tarjouspyynnön tekoäly-yrityksille? Voit tehdä sen", {
          widget: 'requestQuote'
        });
        this.addMessageToState(message);
      };

      handleSeeFeed = () => {
        const message = this.createChatBotMessage("Haluatko katsoa feedia? Voit tehdä sen", {
          widget: "seeFeed"
        });
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