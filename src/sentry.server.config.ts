import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: "https://88ba68aa47fe4ded37f84c649dc54e0f@o4509278946918400.ingest.us.sentry.io/4509279103090688",
  tracesSampleRate: 1.0,
  debug: true,
  environment: "development",
}); 