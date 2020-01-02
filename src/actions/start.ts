import { ContextMessageUpdate } from 'telegraf'

export default async (ctx: ContextMessageUpdate): Promise<void> => {
  try {
    await ctx.reply('👋')
  } catch(error) {
    console.error(error)
  }
}