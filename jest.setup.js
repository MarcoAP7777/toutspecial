// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Extend expect matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null && received !== undefined;
    return {
      message: () => `expected ${received} to be in the document`,
      pass,
    };
  },
  toHaveClass(received, className) {
    const pass = received?.classList?.contains(className);
    return {
      message: () => `expected ${received} to have class ${className}`,
      pass,
    };
  },
});

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
})); 