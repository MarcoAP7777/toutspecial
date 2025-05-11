import { render, screen, fireEvent } from '@testing-library/react';
import * as Sentry from '@sentry/nextjs';
import SentryExamplePage from './page';

jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
}));

describe('SentryExamplePage', () => {
  it('renders page title and description', () => {
    render(<SentryExamplePage />);
    expect(screen.getByText('Página de Teste do Sentry')).toBeInTheDocument();
    expect(screen.getByText(/Clique no botão abaixo para gerar um erro de teste/)).toBeInTheDocument();
  });

  it('captures error when button is clicked', () => {
    render(<SentryExamplePage />);
    const button = screen.getByText('Gerar Erro de Teste');
    
    fireEvent.click(button);
    expect(Sentry.captureException).toHaveBeenCalled();
  });

  it('renders documentation link', () => {
    render(<SentryExamplePage />);
    const link = screen.getByText(/leia nossa documentação/);
    expect(link).toHaveAttribute('href', 'https://docs.sentry.io/platforms/javascript/guides/nextjs/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
}); 