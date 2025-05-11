'use client';

import * as Sentry from '@sentry/nextjs';
import Head from 'next/head';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SentryExamplePage() {
  const generateError = () => {
    try {
      throw new Error('Erro de teste do Sentry');
    } catch (error) {
      if (error instanceof Error) {
        Sentry.captureException(error);
        console.error('Erro capturado pelo Sentry:', error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Página de Teste do Sentry</CardTitle>
          <CardDescription>
            Clique no botão abaixo para gerar um erro de teste que será capturado pelo Sentry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={generateError} variant="destructive">
            Gerar Erro de Teste
          </Button>
        </CardContent>
      </Card>
      <Head>
        <title>sentry-example-page</title>
        <meta name="description" content="Test Sentry for your Next.js app!" />
      </Head>
      <main>
        <p>
          Para mais detalhes sobre como configurar o Sentry,{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.sentry.io/platforms/javascript/guides/nextjs/"
          >
            leia nossa documentação
          </a>
          .
        </p>
      </main>
    </div>
  );
}
