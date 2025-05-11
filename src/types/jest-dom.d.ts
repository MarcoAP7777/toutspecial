/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace jest {
    interface Matchers<R = void> extends TestingLibraryMatchers<typeof expect.stringContaining, R> {
      // Extensão necessária para os matchers do jest-dom
      toBeInTheDocument(): R;
      toHaveClass(...classNames: string[]): R;
    }
  }
}

// A diretiva reference acima deve ser suficiente para carregar os tipos.
