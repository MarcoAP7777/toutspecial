import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RootLayout from '../layout';

// Adiciona tipos globais do Jest
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('has correct metadata', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(container.querySelector('html')).toHaveAttribute('lang', 'pt-BR');
  });
}); 