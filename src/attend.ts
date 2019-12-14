import { ContextMessageUpdate } from 'telegraf';

export const attendHandler = (ctx: ContextMessageUpdate) => {
  const username = ctx.from?.username;

  if (!username) {
    return ctx.reply('Не удалось получить данные пользователя.')
  }

  const input = ctx.match && ctx.match[0];

  if (!input) {
    return ctx.reply('Неизвестная ошибка.')
  }

  const count = input === '+'
    ? 1
    : input.replace('+', '');

  return ctx.reply(`@${username} добавлен в файл записи в количестве ${count}.`)
}