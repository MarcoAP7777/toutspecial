import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Garante que o Cypress acesse a URL correta
    supportFile: false, // Não usaremos arquivo de suporte por enquanto
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Onde encontrar os testes
    video: false, // Desabilitar gravação de vídeo no CI por padrão
    screenshotOnRunFailure: true, // Tira screenshot se um teste falhar no CI
  },
}) 