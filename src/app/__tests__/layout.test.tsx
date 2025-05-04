import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import RootLayout from '../layout';

describe('RootLayout', () => {
  it('renders children correctly', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
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