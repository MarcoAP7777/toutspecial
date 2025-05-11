import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata = {
  title: 'Tout Special',
  description: 'Tout Special - Moda Feminina',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
