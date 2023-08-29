describe('Tekoalyautomaatio app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3001')
  })

  it('Frontpage can be opened', function() {
    cy.contains('Tekoälyautomaatio.fi')
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
    cy.contains('Lisää tekoälyprojektipyyntö').click()
    cy.contains('Lisää ilmoitus')

    cy.get('#title').type('Testiotsikko1')
    cy.get('#description').type('Testiteksti1')
    cy.contains('Julkaise').click()
    cy.contains('Postaus lisätty onnistuneesti')

    cy.get('.menuiconbutton').click()
    cy.get('#openprojects').click()
    cy.contains('Testiotsikko1').click()
    cy.contains('Testiteksti1').click()
    cy.contains('Tarjoukset')

  })

  it('Portaali projektipyynnön lisäys', function() {
    cy.contains('Lisää ilmoitus').click()
    cy.contains('Lisää tekoälyprojektipyyntö').click()
    cy.contains('Lisää ilmoitus')

    cy.get('#isportalpostcheck').click()
    cy.get('#title').type('Testiportaaliotsikko1')
    cy.get('#description').type('Testiportaaliteksti1')
    cy.contains('Julkaise').click()
    cy.contains('Postaus lisätty onnistuneesti')

    cy.get('.menuiconbutton').click()
    cy.contains('Portaali').click()
    cy.contains('Testiportaaliotsikko1')
    cy.get('#Testiportaaliotsikko1').click()
    cy.contains('Testiportaaliteksti1')
    cy.contains('Tarjoukset')

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
    cy.contains('Testiotsikko1').click()

    cy.contains('Tee tarjous').click()


    cy.get('#description').type('Testi tarjous tehtynä')
    cy.contains('Lähetä tarjous').click()
    cy.contains('Tarjoukset')
    cy.contains('Testi tarjous tehtynä')
    cy.contains('Poista tarjous')
  })

})