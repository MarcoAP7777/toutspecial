import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import RootLayout from '../layout';

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

    const htmlElement = container.querySelector('html');
    expect(htmlElement).not.toBeNull();
    expect(htmlElement).toHaveAttribute('lang', 'pt-BR');
  });
}); 