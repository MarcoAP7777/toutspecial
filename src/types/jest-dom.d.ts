/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace jest {
    interface Matchers<R = void> extends TestingLibraryMatchers<R, void> {
      // Adicionando tipos específicos do Jest que estamos usando
      toBe(expected: unknown): R;
      toBeNull(): R;
      toBeTruthy(): R;
    }
  }
} 