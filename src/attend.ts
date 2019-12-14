import { ContextMessageUpdate } from 'telegraf';

export const attendHandler = (ctx: ContextMessageUpdate) => {
  const username: string = ctx.from?.username || '';

  if (!username) {
    return ctx.reply('Не удалось получить данные пользователя.')
  }

  const input: string = (ctx.match && ctx.match[0]) || '';

  if (!input) {
    return ctx.reply('Неизвестная ошибка.')
  }

  const count = input.length > 1 ? input.replace('+', '') : 1

  return ctx.reply(`@${username} добавлен в файл записи в количестве ${count}.`)
}