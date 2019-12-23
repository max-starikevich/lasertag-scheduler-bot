import Telegraf, { ContextMessageUpdate } from 'telegraf'

import startHandler from './start'
import attendHandler from './attend'

export const prepareActions = (bot: Telegraf<ContextMessageUpdate>) => {
  bot.start(startHandler)
  bot.hears(/^я=[0-9]*\.?[0-9]*/, attendHandler)

  return bot
}