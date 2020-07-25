import Telegraf from 'telegraf';

import helpHandler from './help';
import attendHandler from './attend';
import { handlerWrapper } from '../utilities';
import { getSheetsClient } from '../services/sheetsClient';

import { BotContext } from '../types';

export const prepareBot = async () => {
  const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN as string);

  bot.context.sheetsClient = await getSheetsClient();

  bot.start((ctx) => handlerWrapper(helpHandler, ctx));
  bot.help((ctx) => handlerWrapper(helpHandler, ctx));
  bot.hears(/^я=[0-9]*\.?[0-9]*/, (ctx) => handlerWrapper(attendHandler, ctx));

  return bot;
};
