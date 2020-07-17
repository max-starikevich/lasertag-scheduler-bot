import { Context } from 'telegraf';
import { handleActionError } from '../errors';

export default async (ctx: Context): Promise<void> => {
  try {
    const helpMessage = `
      Чтобы записаться в файл используйте один из двух форматов:
      *я=1*    - запишет 1 человека с прокатом
      *я=1.1* - запишет 1 человек с 1 личным стволом
      *я=2.1* - запишет 2 человек, 1 из них с личным стволом
      *я=0*   - выпишет вас из файла (поставит 0 0)
    `;

    await ctx.replyWithMarkdown(helpMessage);
  } catch (error) {
    handleActionError(error);
  }
};
