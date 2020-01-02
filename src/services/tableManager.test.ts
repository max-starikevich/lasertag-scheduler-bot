import { updatePlayerCount } from './tableManager'
import { SheetsClient } from './sheetsClient'
import ClientError from '../classes/ClientError'

const getSheetsClient = async () => {
  const tableData: { [key: string]: string[][] } = {
    'B5:B10': [
      ['test1', 'test2', 'test3', 'test4', 'test5']
    ],
    'C5:C10': [
      ['2', '', '', '1', '']
    ],
    'D5:D10': [
      ['2', '', '', '0', '']
    ]
  }

  const sheetsClient: SheetsClient = {
    get: async (range) => {
      return tableData[range] || [['', '', '', '', '']]
    },
    set: async (range, values) => {
      tableData[range] = values
    }
  }

  return sheetsClient
}

describe('Table manager module', () => {
  describe('#updatePlayerCount', () => {
    it('should update the table and not throw any exception', async () => {
      const sheetsClient = await getSheetsClient()

      const usernameRange = 'B5:B10'
      const countRange = 'C5:C10'
      const personalWeaponsRange = 'D5:D10'

      const username = 'test2'
      const playerCount = 3
      const personalWeaponsCount = 3

      await updatePlayerCount({
        sheetsClient,
        usernameRange, countRange, personalWeaponsRange,
        username, playerCount, personalWeaponsCount
      })

      const expectedRanges = [
        [['test1', 'test2', 'test3', 'test4', 'test5']],
        [['2', '3', '', '1', '']],
        [['2', '3', '', '0', '']]
      ]

      const resultRanges = await Promise.all([
        sheetsClient.get(usernameRange),
        sheetsClient.get(countRange),
        sheetsClient.get(personalWeaponsRange)
      ])

      expect(resultRanges).toEqual(expectedRanges)
    })

    it('should throw an error, if username cannot be found', async () => {
      const sheetsClient = await getSheetsClient()

      const usernameRange = 'B5:B10'
      const countRange = 'C5:C10'
      const personalWeaponsRange = 'D5:D10'

      const username = 'test100' // doesn't exist
      const playerCount = 3
      const personalWeaponsCount = 3

      const updatePromise = updatePlayerCount({
        sheetsClient,
        usernameRange, countRange, personalWeaponsRange,
        username, playerCount, personalWeaponsCount
      })

      await expect(updatePromise).rejects.toEqual(
        new ClientError(`@${username} не найден в таблице`)
      )
    })

    
  })
})