import * as Sentry from '@sentry/node';

export const handleActionError = (error: Error) => {
  console.error('❌ Action failed.', error);
  Sentry.captureException(error);
};

export const handleStartupError = (error: Error) => {
  console.error('❌ Startup failed.', error);
  Sentry.captureException(error);

  process.exit(1);
};

export const handleUnexpectedRejection = (error: any) => {
  console.error('❌ Unexpected rejection.', error);
  Sentry.captureException(error);
};

export class ClientError extends Error {}
