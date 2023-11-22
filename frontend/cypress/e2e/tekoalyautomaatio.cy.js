describe('Tekoalyautomaatio app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3001')
  })

  it('Frontpage can be opened', function() {
    cy.contains('Tekoalyautomaatio.fi')
  })
// 2 käyttäjää luotu valmiiksi testejä varten
  it('Asiakaskäyttäjä voi kirjautua sisään', function() {
    cy.contains('Kirjaudu').click()

    cy.get('#login-username').type('testi')
    cy.get('#login-password').type('testi')
    cy.get('#login-button').click()
    cy.contains('Kirjauduttu sisään')
  })

})

describe('Projektin lisäys asiakaskäyttäjällä', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3001')
    cy.contains('Kirjaudu').click()

    cy.get('#login-username').type('testi')
    cy.get('#login-password').type('testi')
    cy.get('#login-button').click()
    cy.contains('Kirjauduttu sisään')
  })

  it('Avoimen projektipyynnön lisäys', function() {
    cy.contains('Lisää ilmoitus').click()
    cy.contains('Lisää ilmoitus')

    cy.get('#description').type('Testi tarkoitus 1')
    cy.get('#functionality').type('Testi toiminnallisuudet tähän 1')
    cy.get('#other').type('Muut toiveet tulee tähän')
    cy.contains('Seuraava').click()
    
    cy.contains('Aseta tarjouskilpailullesi takaraja')
    cy.get('#minPrice').type(200)
    cy.get('#maxPrice').type(300)
    cy.contains('Seuraava').click()

    cy.contains('Perustiedot')
    cy.contains('Ehdot')
    cy.contains('Lähetä').click()
    cy.contains('Ilmoitus lisätty onnistuneesti')

    cy.get('.menuiconbutton').click()
    cy.get('#openprojects').click()
    cy.contains('Testi tarkoitus 1').click()
    cy.contains('Tarjoukset')
  })

  it('Portaali projektipyynnön lisäys', function() {
    cy.contains('Lisää ilmoitus').click()
    cy.contains('Lisää ilmoitus')

    cy.get('#description').type('Testi portaali tarkoitus 1')
    cy.get('#functionality').type('Testi toiminnallisuudet tähän portaaliin 1')
    cy.get('#other').type('Muut toiveet tulee portaaliin tähän')
    cy.contains('Seuraava').click()
    
    cy.contains('Aseta tarjouskilpailullesi takaraja')

    cy.contains("Ei (Ilmoitus menee vain toimittajaportaaliin)").click()

    cy.get('#minPrice').type(200)
    cy.get('#maxPrice').type(300)
    cy.contains('Seuraava').click()

    cy.contains('Perustiedot')
    cy.contains('Ehdot')
    cy.contains('Lähetä').click()
    cy.contains('Ilmoitus lisätty onnistuneesti')

    cy.get('.menuiconbutton').click()
    cy.contains('Portaali').click()
    cy.contains('Testi portaali tarkoitus 1').click()
    cy.contains('Tarjoukset')

  })

  it('Feed ilmoituksen lisäys', function() {
    cy.contains('Feed').click()
    cy.contains('Lisää julkaisu feediin').click()

    cy.get('#description').type('Testi ilmoitus feediin')
    
    cy.contains('Julkaise').click()

    cy.contains('Postaus lisätty onnistuneesti')
  
    cy.contains('Feed').click()
    cy.contains('Testi ilmoitus feediin')
  
  })

})


describe('Tarjouksen tekeminen devaajakäyttäjällä', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3001')
    cy.contains('Kirjaudu').click()

    cy.get('#login-username').type('firma')
    cy.get('#login-password').type('firma')
    cy.get('#login-button').click()
    cy.contains('Kirjauduttu sisään')
  })

  it('Avoimen projektipyynnön lisäys', function() {
    cy.contains('Avoimet tekoälyprojektit').click()
    cy.contains('Avoimet tekoälyprojektit etsivät tekijöitä!')
    cy.contains('Testi tarkoitus 1').click()

    cy.contains('Tee tarjous').click()

    cy.get('#minPrice').type(200)
    cy.get('#maxPrice').type(300)
    cy.get('#description').type('Testi tarjous tehtynä')
    cy.contains('Lähetä tarjous').click()
    cy.contains('Tarjoukset')
    cy.contains('Testi tarjous tehtynä')
    cy.contains('Poista tarjous')
  })

})
