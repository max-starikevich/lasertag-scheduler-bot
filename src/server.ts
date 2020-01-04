import { prepareBot } from './actions'
import { checkEnvironment } from './environment'

checkEnvironment()
  .then(prepareBot)
  .then(bot => bot.launch())
  .then(() => console.log('🚀 Bot has started successfully!'))
  .catch(error => {
    console.error('❌ Bot has failed to start.', error.message)
    process.exit(1)
  })
  
process.on('unhandledRejection', reason => {
  console.error('❌ Unhandled Rejection.', reason)
})
  