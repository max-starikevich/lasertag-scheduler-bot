import { ContextMessageUpdate } from 'telegraf'

import ClientError from '../classes/ClientError'
import { getSheetsClient } from '../services/sheetsClient'
import { updatePlayerCount } from '../services/tableManager'

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

    const [playerCount = 0, personalWeaponsCount = 0] = input.split('.').map(value => +value || 0)

    const sheetsClient = await getSheetsClient();

    const countRange = process.env.COUNT_RANGE as string
    const usernameRange = process.env.USERNAME_RANGE as string
    const personalWeaponsRange = process.env.PERSONAL_WEAPONS_RANGE as string

    await updatePlayerCount({ 
      countRange, usernameRange, personalWeaponsRange,
      sheetsClient, username, playerCount, personalWeaponsCount
    })

    const formatResultMessage = () => {
      if (playerCount === 0) {
        return `@${username} выписан из файла записи`
      }
    
      const personalWeaponInfo = (personalWeaponsCount > 0 && ` 🔫 x${personalWeaponsCount}`) || ''
    
      return `@${username} внесен в файл записи: 💂 x${playerCount}` + personalWeaponInfo
    }

    const resultMessage = formatResultMessage()
    await ctx.reply(resultMessage)

  } catch(error) {
    if (error instanceof ClientError) {
      await ctx.reply(`❌ ${error.message}`)
      return
    }

    console.error(error)
    await ctx.reply(`😞 Неизвестная ошибка`)
  }
}
