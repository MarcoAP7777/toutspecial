describe('Página Inicial', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('deve exibir o título da página', () => {
    cy.get('h1').should('contain', 'ToutSpecial')
  })

  it('deve ter um botão de login', () => {
    cy.get('button').contains('Login').should('be.visible')
  })

  it('deve ter um botão de registro', () => {
    cy.get('button').contains('Registrar').should('be.visible')
  })
}) 