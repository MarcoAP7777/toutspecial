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

// Mock do next/font/google
jest.mock('next/font/google', () => ({
  Inter: () => ({
    variable: 'mock-font-variable',
  }),
}));

describe('RootLayout', () => {
  it('renders children correctly', async () => {
    await act(async () => {
      render(
        <div id="root">
          <RootLayout>
            <div data-testid="test-child">Test Content</div>
          </RootLayout>
        </div>
      );
    });

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('applies font classes', async () => {
    await act(async () => {
      render(
        <div id="root">
          <RootLayout>
            <div>Test Content</div>
          </RootLayout>
        </div>
      );
    });

    const container = screen.getByText('Test Content').closest('div');
    expect(container).toHaveClass('min-h-screen', 'bg-gray-50');
  });
});
