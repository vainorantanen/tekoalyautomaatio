class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowercase = message.toLowerCase();
  
      if (lowercase.includes("moi")) {
        this.actionProvider.greet();
      }

      if (lowercase.includes("rekisteröidy") || lowercase.includes("luo profiili")) {
        this.actionProvider.handleRegister();
      } else if (lowercase.includes("tekoälyprojekti") || lowercase.includes("uusi projekti")) {
        this.actionProvider.handleNewProject();
      } else if (lowercase.includes("tarjouspyyntö") || lowercase.includes("saat tarjouksia")) {
        this.actionProvider.handleQuoteRequest();
      } else if (lowercase.includes("feed") || lowercase.includes("julkaisu")) {
        this.actionProvider.handleSeeFeed()
      }
  
    }
  }
  
  export default MessageParser;