import { ContextMessageUpdate } from 'telegraf'

export default async (ctx: ContextMessageUpdate): Promise<void> => {
  try {
    await ctx.reply('Welcome! Add me to your Lasertag chat to see what I can do!')
  } catch(error) {
    console.error(error)
  }
}