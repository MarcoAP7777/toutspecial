/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { act } from 'react-dom/test-utils';

import RootLayout from '../layout';

jest.mock('@/components/ui/toaster', () => ({
  Toaster: () => null,
}));

const renderWithLayout = (children: ReactElement) => {
  return render(<RootLayout>{children}</RootLayout>);
};

describe('RootLayout', () => {
  it('renders children correctly', async () => {
    await act(async () => {
      render(
        <RootLayout>
          <div data-testid="test-child">Test Content</div>
        </RootLayout>
      );
    });

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('applies font classes', async () => {
    await act(async () => {
      render(
        <RootLayout>
          <div>Test Content</div>
        </RootLayout>
      );
    });

    const container = screen.getByText('Test Content').parentElement;
    expect(container).toHaveClass('min-h-screen', 'bg-gray-50');
  });
}); 