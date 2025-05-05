/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { expect } from '@jest/globals';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeNull(): R;
      toBeTruthy(): R;
    }
  }
} 