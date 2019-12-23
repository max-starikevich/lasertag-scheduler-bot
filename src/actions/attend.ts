import { ContextMessageUpdate } from 'telegraf'
import { updatePlayerCount } from '../services/tableManager'

export default async (ctx: ContextMessageUpdate) => {
  try {
    const username: string = ctx.from?.username || ''

    if (!username) {
      await ctx.reply('Не удалось получить данные пользователя.')
      return
    }

    const input: string = ((ctx.match && ctx.match[0]) || '').replace('я=', '')

    if (!input) {
      return
    }

    const [count = '0', personalWeaponsCount = '0'] = input.split('.')

    await updatePlayerCount(username, count, personalWeaponsCount)

    const resultMessage = formatResultMessage(
      username, 
      parseInt(count), 
      parseInt(personalWeaponsCount)
    )

    await ctx.reply(resultMessage)
  } catch(error) {
    console.error(error)
  }
}

const formatResultMessage = (
  username: string,
  count: number, 
  personalWeaponsCount: number
) => {
  
  if (count === 1) {
    if (personalWeaponsCount > 0) {
      return `@${username} внесен в файл записи с личкой`
    }
    return `@${username} внесен в файл записи`
  } else if (count > 0) {
    if (personalWeaponsCount > 0) {
      return `@${username} внесен в файл записи в количестве ${count} (личка x${personalWeaponsCount})`
    }
    return `@${username} внесен в файл записи в количестве ${count}`
  }
  
  return `@${username} выписан из файла записи`
}