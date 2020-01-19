export const handleActionError = (error: Error) => {
  console.error('❌ Action error.', error)
}

export const handleStartupError = (error: Error) => {
  console.error('❌ Startup error.', error.message)
  process.exit(1)
}

export const handleUnexpectedRejection = (error: any) => {
  console.error('❌ Unexpected rejection.', error)
}

export default class ClientError extends Error {}