import { getSheetsClient } from '../services/sheetsClient'
import ClientError from '../classes/ClientError'

export const updatePlayerCount = async (
  usernameToFind: string,
  targetCount: number,
  personalWeaponsCount: number
): Promise<void> => {
  const sheetsClient = await getSheetsClient()
  const countRange = process.env.COUNT_RANGE as string
  const usernameRange = process.env.USERNAME_RANGE as string
  const personalWeaponRange = process.env.PERSONAL_WEAPON_RANGE as string

  const [[counts], [usernames], [personalWeapons]] = await Promise.all([
    sheetsClient.get(countRange),
    sheetsClient.get(usernameRange),
    sheetsClient.get(personalWeaponRange),
  ])

  const targetIndex = usernames.findIndex(username => username === usernameToFind)

  if (targetIndex === -1) {
    throw new ClientError(`@${usernameToFind} не найден в таблице`)
  }

  counts[targetIndex] = targetCount.toString()
  personalWeapons[targetIndex] = personalWeaponsCount.toString()

  await sheetsClient.set(countRange, [counts])
  await sheetsClient.set(personalWeaponRange, [personalWeapons])
}
