import Telegraf from 'telegraf'

import helpHandler from './help'
import attendHandler from './attend'

export const prepareBot = () => {
  if (!process.env.BOT_TOKEN) {
    throw new Error('Missing BOT_TOKEN')
  }

  const bot = new Telegraf(process.env.BOT_TOKEN)

  bot.start(helpHandler)
  bot.help(helpHandler)
  
  bot.hears(/^я=[0-9]*\.?[0-9]*/, attendHandler)

  return bot
}