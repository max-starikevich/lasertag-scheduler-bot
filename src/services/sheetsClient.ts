
import { google } from 'googleapis'

if (!process.env.SPREADSHEET_ID) { throw new Error('Missing SPREADSHEET_ID') }
if (!process.env.SHEET_NAME) { throw new Error('Missing SHEET_NAME') }

const sheets = google.sheets('v4')
const scopes = ['https://www.googleapis.com/auth/spreadsheets']
const spreadsheetId = process.env.SPREADSHEET_ID
const sheetName = process.env.SHEET_NAME

interface IReadSheetsParams {
  auth: any,
  spreadsheetId: string,
  sheetName: string
}

interface IWriteSheetsParams extends IReadSheetsParams {
  key: string,
  value: string
}

const getAuthToken = async () => {
  const auth = new google.auth.GoogleAuth({ scopes })
  const authToken = await auth.getClient()
  return authToken
}

const getSheetsValues = ({ spreadsheetId, auth, sheetName }: IReadSheetsParams) => {
  return sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName
  })
}

const setSheetsValue = ({ spreadsheetId, auth, sheetName, key, value }: IWriteSheetsParams) => {
  return sheets.spreadsheets.values.update({
    spreadsheetId,
    auth,
    range: `${sheetName}!${key}`,
    requestBody: { values: [[value]] },
    valueInputOption: 'RAW'
  })
}

export const initSheetsClient = async () => {
  const auth = await getAuthToken()

  const requestParams = { spreadsheetId, auth, sheetName }

  return {
    get: () => getSheetsValues(requestParams),
    set: (key: string, value: string) => setSheetsValue({
      ...requestParams, key, value
    })
  }
}