/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';

import RootLayout from '../layout';

const renderWithLayout = (children: ReactElement) => {
  return render(<RootLayout>{children}</RootLayout>);
};

describe('RootLayout', () => {
  it('renders children correctly', () => {
    renderWithLayout(<div>Test Content</div>);
    const element = screen.getByText('Test Content');
    expect(element).toBeInTheDocument();
  });

  it('applies font classes to body', () => {
    const { container } = renderWithLayout(<div>Test Content</div>);
    const body = container.querySelector('body');
    expect(body).toBeTruthy();
    expect(body).toHaveClass('antialiased');
    expect(body).toHaveClass('variable');
  });
}); 