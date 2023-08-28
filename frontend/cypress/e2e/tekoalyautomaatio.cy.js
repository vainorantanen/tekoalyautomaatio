describe('Tekoalyautomaatio app', function() {
  it('Frontpage can be opened', function() {
    cy.visit('http://localhost:3001')
    cy.contains('Tekoälyautomaatio.fi')
  })
})