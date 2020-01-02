import Telegraf from 'telegraf'

import startHandler from './start'
import attendHandler from './attend'

export const prepareBot = () => {
  if (!process.env.BOT_TOKEN) {
    throw new Error('Missing BOT_TOKEN')
  }

  const bot = new Telegraf(process.env.BOT_TOKEN)

  bot.start(startHandler)
  bot.hears(/^я=[0-9]*\.?[0-9]*/, attendHandler)

  return bot
}