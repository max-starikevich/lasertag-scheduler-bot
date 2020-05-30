import { google } from 'googleapis';
import { Compute, JWT, UserRefreshClient } from 'google-auth-library';

const { spreadsheets } = google.sheets('v4');

interface ReadSheetParams {
  auth: Compute | JWT | UserRefreshClient;
  spreadsheetId: string;
  ranges: string[];
}

interface ChangeSheetParams {
  auth: Compute | JWT | UserRefreshClient;
  spreadsheetId: string;
  data: ValueRange[];
}

export interface ValueRange {
  range?: string | null;
  values?: any[][] | null;
}

const getAuthToken = async (): Promise<Compute | JWT | UserRefreshClient> => {
  const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
  const auth = new google.auth.GoogleAuth({ scopes });
  const authToken = await auth.getClient();
  return authToken;
};

const getSheetsValues = async ({
  spreadsheetId,
  auth,
  ranges
}: ReadSheetParams): Promise<ValueRange[]> => {
  const response = await spreadsheets.values.batchGet({
    spreadsheetId,
    ranges,
    auth
  });
  return response.data.valueRanges || [];
};

const setSheetsValue = async ({
  spreadsheetId,
  auth,
  data
}: ChangeSheetParams): Promise<void> => {
  await spreadsheets.values.batchUpdate({
    spreadsheetId,
    auth,
    requestBody: {
      data,
      valueInputOption: 'RAW'
    }
  });
};

export interface SheetsClient {
  get: (ranges: string[]) => Promise<ValueRange[]>;
  set: (valueRanges: ValueRange[]) => Promise<void>;
}

export const getSheetsClient = async (): Promise<SheetsClient> => {
  const spreadsheetId = process.env.SPREADSHEET_ID as string;
  const sheetName = process.env.SHEET_NAME as string;

  const auth = await getAuthToken();
  const requestParams = { spreadsheetId, auth };

  return {
    get: (ranges) =>
      getSheetsValues({
        ...requestParams,
        ranges: ranges.map((range) => `${sheetName}!${range}`)
      }),
    set: async (valueRanges) =>
      setSheetsValue({
        ...requestParams,
        data: valueRanges
      })
  };
};
