'use client';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-red-600">Algo deu errado!</h2>
            <p className="mb-4 text-gray-600">
              {error.message || 'Ocorreu um erro inesperado. Por favor, tente novamente.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
