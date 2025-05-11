'use client';

import * as Sentry from '@sentry/nextjs';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Algo deu errado!</h2>
        <p className="text-gray-600 mb-4">
          Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando na solução.
        </p>
        <button
          onClick={() => Sentry.showReportDialog({ eventId: error.digest })}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reportar Feedback
        </button>
      </div>
    </div>
  );
}
