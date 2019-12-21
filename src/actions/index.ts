import Telegraf, { ContextMessageUpdate } from 'telegraf'

import startHandler from './start'
import attendHandler from './attend'

export const prepareActions = (bot: Telegraf<ContextMessageUpdate>) => {
  bot.start(startHandler)
  bot.hears(/^\+\d*$/, attendHandler)

  return bot
}