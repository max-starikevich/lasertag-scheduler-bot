import { prepareBot } from './actions'

prepareBot()
  .launch()
  .then(() => console.log('🚀 Bot has started successfully!'))
  .catch(error => {
    console.error('❌ Bot has failed to start.', error)
    process.exit(1)
  })

process.on('unhandledRejection', reason => {
  console.error('❌ Unhandled Rejection.', reason)
})