import { getSheetsClient } from '../services/sheetsClient'

export const updatePlayerCount = async (
  usernameToFind: string,
  targetCount: number,
  personalWeaponsCount: number
): Promise<boolean> => {
  try {
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
      return false
    }
  
    counts[targetIndex] = targetCount.toString()
    personalWeapons[targetIndex] = personalWeaponsCount.toString()
  
    await sheetsClient.set(countRange, [counts])
    await sheetsClient.set(personalWeaponRange, [personalWeapons])
  
    return true
  } catch(error) {
    return false
  }
}
