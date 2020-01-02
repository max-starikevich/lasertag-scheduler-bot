import { SheetsClient } from '../services/sheetsClient'
import ClientError from '../classes/ClientError'

interface UpdateParams {
  sheetsClient: SheetsClient;
  username: string;
  playerCount: number;
  personalWeaponsCount: number;
  countRange: string;
  usernameRange: string;
  personalWeaponsRange: string;
}

export const updatePlayerCount = async ({
  countRange, usernameRange, personalWeaponsRange,
  sheetsClient, username, playerCount, personalWeaponsCount
}: UpdateParams): Promise<void> => {
  const [
    [countColumn], [usernameColumn], [personalWeaponsColumn]
  ] = await Promise.all([
    sheetsClient.get(countRange),
    sheetsClient.get(usernameRange),
    sheetsClient.get(personalWeaponsRange),
  ])

  const targetIndex = usernameColumn.findIndex(usernameElement => usernameElement === username)

  if (targetIndex === -1) {
    throw new ClientError(`@${username} не найден в таблице`)
  }

  countColumn[targetIndex] = playerCount.toString()
  personalWeaponsColumn[targetIndex] = personalWeaponsCount.toString()

  await sheetsClient.set(countRange, [countColumn])
  await sheetsClient.set(personalWeaponsRange, [personalWeaponsColumn])
}
