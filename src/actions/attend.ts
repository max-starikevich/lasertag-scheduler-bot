import { ContextMessageUpdate } from 'telegraf'
import { initSheetsClient } from '../services/sheetsClient'

const getSheetsClient = initSheetsClient()

export default async (ctx: ContextMessageUpdate) => {
  try {
    const username: string = ctx.from?.username || ''

    if (!username) {
      await ctx.reply('Не удалось получить данные пользователя.')
      return
    }

    const input: string = (ctx.match && ctx.match[0]) || ''

    if (!input) {
      await ctx.reply('Неизвестная ошибка.')
      return
    }

    const count = input.length > 1 ? input.replace('+', '') : 1
    const sheetsClient = await getSheetsClient

    await sheetsClient.set('A1', `${username}: ${count}`)
    await ctx.reply(`@${username} добавлен в файл записи в количестве ${count}.`)
  } catch(error) {
    console.error(error)
  }
}