/// <reference types="@testing-library/jest-dom" />

import type { expect } from '@jest/globals';

declare module '@jest/expect' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: string): R;
    toBeNull(): R;
  }
} 