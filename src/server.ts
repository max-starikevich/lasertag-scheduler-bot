import * as Sentry from '@sentry/node';
import { name, version } from '../package.json';

Sentry.init({ release: `${name}@${version}` });

import { prepareBot } from './actions';
import { checkEnvironment } from './environment';
import { handleStartupError, handleUnexpectedRejection } from './errors';

checkEnvironment()
  .then(prepareBot)
  .then((bot) => bot.launch())
  .then(() => console.log('🚀 Bot has started successfully!'))
  .catch(handleStartupError);

process.on('unhandledRejection', handleUnexpectedRejection);
