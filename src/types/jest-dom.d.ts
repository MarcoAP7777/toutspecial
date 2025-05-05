import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module '@jest/expect' {
  interface AsymmetricMatchers extends TestingLibraryMatchers<any, any> {}
  interface Matchers<R = void> extends TestingLibraryMatchers<R, any> {}
} 