"use client";

import * as Sentry from "@sentry/nextjs";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Algo deu errado!</h2>
          <button
            onClick={() => {
              Sentry.showReportDialog({ eventId: error.digest });
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reportar erro
          </button>
        </div>
      </body>
    </html>
  );
}