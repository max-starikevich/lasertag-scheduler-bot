import * as Sentry from '@sentry/node';

export const handleActionError = (error: Error) => {
  console.error('❌ Action error.', error.message);
  Sentry.captureException(error);
};

export const handleStartupError = (error: Error) => {
  console.error('❌ Startup error.', error.message);
  Sentry.captureException(error);

  process.exit(1);
};

export const handleUnexpectedRejection = (error: any) => {
  console.error('❌ Unexpected rejection.', error);
  Sentry.captureException(error);

  process.exit(1);
};

export default class ClientError extends Error {}
