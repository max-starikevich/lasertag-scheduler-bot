import { Context } from 'telegraf';

export default async (ctx: Context): Promise<void> => {
  const helpMessage = `
    Чтобы записаться в файл используйте один из следующих форматов:
    *я=1*    - если у вас свой ствол
    *я=1.1* - если вам нужен прокат
    *я=2.1* - если вас двое и одному из вас нужен прокат
    *я=0*   - если хотите выписаться из файла
  `;

  await ctx.replyWithMarkdown(helpMessage);
};
