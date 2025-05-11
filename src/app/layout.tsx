import * as Sentry from '@sentry/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Tout Spécial',
  description: 'E-commerce de moda em desenvolvimento',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        <Sentry.ErrorBoundary fallback={<div>Ocorreu um erro inesperado.</div>}>
          <div className={`${inter.variable} min-h-screen bg-gray-50`}>
            {children}
          </div>
        </Sentry.ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}
