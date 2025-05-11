// Import commands.js using ES2015 syntax:
import './commands';

// Import global styles
import '../../src/app/globals.css';

import { mount } from '@cypress/react';

declare module 'cypress' {
  interface Chainable {
    mount: typeof mount;
  }
}

Cypress.Commands.add('mount', mount);
