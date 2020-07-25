import { TelegrafContext } from 'telegraf/typings/context';

export type AttendHandlerFunction = (ctx: BotContext) => Promise<any>;

export interface BotContext extends TelegrafContext {
  sheetsClient?: SheetsClient;
}

export interface SheetsClient {
  get: (ranges: string[]) => Promise<ValueRange[]>;
  set: (valueRanges: ValueRange[]) => Promise<void>;
}

export interface ValueRange {
  range?: string | null;
  values?: any[][] | null;
}
