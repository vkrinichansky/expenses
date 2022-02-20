import { FormModesEnum, TablesTypesEnum } from './consts';

export interface TableItem {
  name: string;
  value: number;
}

export interface AppData {
  expenses: TableItem[];
  income: TableItem[];
  balance: number;
  history: TransactionsHistory;
}

export interface AddedHistoryItem {
  category: string;
  value: number;
}

export interface HistoryItem {
  [TablesTypesEnum.Expenses]: AddedHistoryItem[];
  [TablesTypesEnum.Income]: AddedHistoryItem[];
}

export interface TransactionsHistory {
  [date: string]: HistoryItem;
}

interface Record {
  date: string;
  record: HistoryItem;
}
