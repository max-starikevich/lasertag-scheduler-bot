import Telegraf from 'telegraf'

import helpHandler from './help'
import attendHandler from './attend'

export const prepareBot = async () => {
  const bot = new Telegraf(process.env.BOT_TOKEN as string)

  bot.start(helpHandler)
  bot.help(helpHandler)
  
  bot.hears(/^я=[0-9]*\.?[0-9]*/, attendHandler)

  return bot
}