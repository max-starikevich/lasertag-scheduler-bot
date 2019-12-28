
import { google } from 'googleapis'
import { Compute, JWT, UserRefreshClient } from 'google-auth-library'

const sheets = google.sheets('v4')

interface ReadSheetParams {
  auth: Compute | JWT | UserRefreshClient;
  spreadsheetId: string;
  range: string;
}

interface ChangeSheetParams extends ReadSheetParams {
  values: string[][];
}

const getAuthToken = async (): Promise<Compute | JWT | UserRefreshClient> => {
  const scopes = ['https://www.googleapis.com/auth/spreadsheets']
  const auth = new google.auth.GoogleAuth({ scopes })
  const authToken = await auth.getClient()
  return authToken
}

const getSheetsValues = async ({ spreadsheetId, auth, range }: ReadSheetParams): Promise<string[][]> => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId, auth, range
    })
    return response.data.values || [[]]
  } catch(error) {
    return [[]]
  }
}

const setSheetsValue = async ({ spreadsheetId, auth, range, values }: ChangeSheetParams): Promise<boolean> => {
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      auth,
      range,
      valueInputOption: 'RAW',
      requestBody: { values }
    })
    return true
  } catch(error) {
    return false
  }
}

export const getSheetsClient = async () => {
  const spreadsheetId = process.env.SPREADSHEET_ID as string
  const sheetName = process.env.SHEET_NAME as string

  const auth = await getAuthToken()
  const requestParams = { spreadsheetId, auth }

  return {
    get: (range: string) => {
      return getSheetsValues({ ...requestParams, range: `${sheetName}!${range}` })
    },
    set: (range: string, values: string[][]) => {
      return setSheetsValue({ ...requestParams, range: `${sheetName}!${range}`, values })
    }
  }
} 