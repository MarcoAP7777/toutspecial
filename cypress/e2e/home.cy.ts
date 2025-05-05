describe('Página Inicial', () => {
  it('deve carregar corretamente', () => {
    cy.visit('/')
    cy.get('html').should('have.attr', 'lang', 'pt-BR')
  })
}) 