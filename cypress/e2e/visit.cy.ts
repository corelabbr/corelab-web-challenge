describe('Just visit homepage', () => {
  it('should visit', () => {
    cy.visit('/')

    cy.get('h1')
      .should('exist')
      .should('have.text', /core notes/i)
  })
})
