import { defineConfig } from 'cypress';
import vitePreprocessor from '@cypress/vite-dev-server';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Garante que o Cypress acesse a URL correta
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Onde encontrar os testes
    video: false, // Desabilitar gravação de vídeo no CI por padrão
    screenshotOnRunFailure: true, // Tira screenshot se um teste falhar no CI
    setupNodeEvents(on, config) {
      on('dev-server:start', options => {
        return vitePreprocessor({
          ...options,
          viteConfig: {
            server: {
              port: 3000,
            },
          },
        });
      });
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    supportFile: 'cypress/support/component.ts',
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
  },
});
