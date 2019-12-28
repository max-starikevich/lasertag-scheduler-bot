import Telegraf from 'telegraf'
import { prepareActions } from './actions'

if (!process.env.BOT_TOKEN) { throw new Error('Missing BOT_TOKEN') }

const bot = new Telegraf(process.env.BOT_TOKEN)

prepareActions(bot)
  .launch()
  .then(() => console.log('🚀 Bot has started successfully!'))
  .catch(error => {
    console.error('❌ Bot has failed to start.', error)
    process.exit(1)
  })

process.on('unhandledRejection', reason => {
  console.error('❌ Unhandled Rejection.', reason)
})