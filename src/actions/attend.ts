import { ContextMessageUpdate } from 'telegraf'
import { updatePlayerCount } from '../services/tableManager'
import ClientError from '../classes/ClientError'

const formatResultMessage = (
  username: string,
  count: number, 
  personalWeaponsCount: number
): string => {
  if (count === 0) {
    return `@${username} выписан из файла записи`
  }

  const weaponInfo = (personalWeaponsCount > 0 && ` 🔫 x${personalWeaponsCount}`) || ''

  return `@${username} внесен в файл записи: 💂 x${count}` + weaponInfo
}

export default async (ctx: ContextMessageUpdate): Promise<void> => {
  try {
    const username: string = ctx.from?.username || ''

    if (!username) {
      throw new ClientError('Не удалось прочитать имя пользователя')
    }

    const input: string = ((ctx.match && ctx.match[0]) || '').replace('я=', '')

    if (!input) {
      throw new ClientError('Не удалось прочитать команду')
    }

    const [count = 0, personalWeaponsCount = 0] = input.split('.').map(value => +value || 0)

    await updatePlayerCount(username, count, personalWeaponsCount)

    const resultMessage = formatResultMessage(username, count, personalWeaponsCount)
    await ctx.reply(resultMessage)

  } catch(error) {
    if (error instanceof ClientError) {
      await ctx.reply(`❌ ${error.message}`)
      return
    }

    console.error(error)
    await ctx.reply(`❌ Что-то пошло не так...`)
  }
}
