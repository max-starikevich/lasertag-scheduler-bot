import { ContextMessageUpdate } from 'telegraf'
import { handleActionError } from '../errors'

export default async (ctx: ContextMessageUpdate): Promise<void> => {
  try {
    const helpMessage = `
      Чтобы записаться в файл используйте один из двух форматов:
      *я=1*    - запишет 1 человека с прокатом
      *я=1.1* - запишет 1 человек с 1 личным стволом
    `;

    await ctx.replyWithMarkdown(helpMessage)
  } catch(error) {
    handleActionError(error)
  }
}