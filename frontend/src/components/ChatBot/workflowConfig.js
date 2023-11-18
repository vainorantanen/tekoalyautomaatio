const workflowConfig = [
    {
      id: 1,
      botResponse: 'Tervetuloa sivustollemme! Miten voimme auttaa sinua tänään?',
      nextStep: 2,
    },
    {
      id: 2,
      userResponseKeywords: ['rekisteröidy', 'luo profiili'],
      botResponse: 'Haluatko rekisteröityä sivustolle ja luoda profiilin? (Kyllä/Ei)',
      nextStepYes: 3,
      nextStepNo: 4,
    },
    {
      id: 3,
      botResponse: 'Mahtavaa! Voit nyt luoda profiilisi ja jakaa tekoälyprojektisi muiden kanssa.',
      nextStep: null,
    },
    {
      id: 4,
      userResponseKeywords: ['tekoälyprojekti', 'uusi projekti'],
      botResponse: 'Haluatko luoda uuden tekoälyprojektin? (Kyllä/Ei)',
      nextStepYes: 5,
      nextStepNo: 7,
    },
    {
      id: 5,
      botResponse: 'Kerro lisää uudesta tekoälyprojektistasi. Mitkä ovat tavoitteesi ja vaatimuksesi?',
      nextStep: 6,
    },
    {
      id: 6,
      botResponse: 'Kiitos projektisi jakamisesta! Voit nyt odottaa tarjouksia tekoälyyrityksiltä.',
      nextStep: null,
    },
    {
      id: 7,
      userResponseKeywords: ['tarjouspyyntö', 'saat tarjouksia'],
      botResponse: 'Haluatko jättää tarjouspyynnön tekoälyyrityksille? (Kyllä/Ei)',
      nextStepYes: 8,
      nextStepNo: null,
    },
    {
      id: 8,
      botResponse: 'Kerro lisää tarjouspyynnöstäsi. Mitä odotat ja mikä on budjettisi?',
      nextStep: 6, // Voit mukauttaa tätä askelta sen mukaan, mitä haluat seuraavaksi.
    },
  ];
  
  export default workflowConfig;
  
  