import '@testing-library/jest-dom/extend-expect';

declare module '@testing-library/jest-dom' {
  export interface Matchers<R = void> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: string): R;
  }
} 