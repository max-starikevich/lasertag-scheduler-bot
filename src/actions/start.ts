import { ContextMessageUpdate } from 'telegraf'

export default async (ctx: ContextMessageUpdate) => {
  try {
    await ctx.reply('Welcome! Add me to your Lasertag chat to see what I can do!')
  } catch(error) {
    console.error(error)
  }
}