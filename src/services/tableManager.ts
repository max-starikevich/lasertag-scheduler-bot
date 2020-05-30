import { SheetsClient, ValueRange } from '../services/sheetsClient';
import ClientError from '../errors';

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
  countRange,
  usernameRange,
  personalWeaponsRange,
  sheetsClient,
  username,
  playerCount,
  personalWeaponsCount
}: UpdateParams): Promise<void> => {
  const [
    countData,
    usernameData,
    personalWeaponsData
  ] = await sheetsClient.get([countRange, usernameRange, personalWeaponsRange]);

  if (!usernameData || !usernameData.values || !usernameData.values.length) {
    throw new ClientError(
      `Не удалось найти список пользователей в ${usernameRange}`
    );
  }

  const targetIndex = usernameData.values.findIndex(
    (value) => value[0] === username
  );

  if (targetIndex === -1) {
    throw new ClientError(`@${username} не найден в таблице`);
  }

  const updatedCountData: ValueRange = {
    ...countData,
    values: usernameData.values.map((_, index) => {
      if (index === targetIndex) return [playerCount.toString()];
      return (countData && countData.values && countData.values[index]) || [''];
    })
  };

  const updatedPersonalWeaponsData: ValueRange = {
    ...personalWeaponsData,
    values: usernameData.values.map((_, index) => {
      if (index === targetIndex) return [personalWeaponsCount.toString()];
      return (
        (personalWeaponsData &&
          personalWeaponsData.values &&
          personalWeaponsData.values[index]) || ['']
      );
    })
  };

  await sheetsClient.set([updatedCountData, updatedPersonalWeaponsData]);
};
