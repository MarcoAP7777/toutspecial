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
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies font classes to body', () => {
    const { container } = renderWithLayout(<div>Test Content</div>);
    const body = container.querySelector('body');
    expect(body).toBeTruthy();
    expect(body?.className).toContain('antialiased');
    expect(body?.className).toContain('variable');
  });
}); 