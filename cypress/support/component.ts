// Import commands.js using ES2015 syntax:
import './commands';

// Import global styles
import '../../src/app/globals.css';

declare global {
  namespace Cypress {
    interface Chainable {
      // Adicione comandos customizados aqui se necessário
    }
  }
}
