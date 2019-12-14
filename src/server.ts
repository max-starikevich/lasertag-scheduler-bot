import Telegraf from 'telegraf'
import { attendHandler } from './attend'

if (!process.env.BOT_TOKEN) {
  throw new Error('Missing BOT_TOKEN')
}

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => ctx.reply('Welcome! Add me to your Lasertag chat to see what I can do!'))
bot.hears(/^\+\d*$/, attendHandler)

bot.launch()