import { render, screen, fireEvent } from '@testing-library/react';
import * as Sentry from '@sentry/nextjs';
import GlobalError from './global-error';

jest.mock('@sentry/nextjs', () => ({
  showReportDialog: jest.fn(),
}));

describe('GlobalError', () => {
  const mockError = {
    name: 'TestError',
    message: 'Test error',
    digest: 'test-digest',
  } as Error & { digest?: string };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders error message', () => {
    render(<GlobalError error={mockError} />);
    expect(screen.getByText('Algo deu errado!')).toBeInTheDocument();
  });

  it('shows report dialog when button is clicked', () => {
    render(<GlobalError error={mockError} />);
    const reportButton = screen.getByText('Reportar Feedback');

    fireEvent.click(reportButton);
    expect(Sentry.showReportDialog).toHaveBeenCalledWith({
      eventId: mockError.digest,
    });
  });
});
