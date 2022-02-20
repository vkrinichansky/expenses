import { TablesTypesEnum } from './consts';

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

export interface HistoryCategoryItem {
  categoryName: string;
  value: number;
}

export interface HistoryItem {
  [TablesTypesEnum.Expenses]: HistoryCategoryItem[];
  [TablesTypesEnum.Income]: HistoryCategoryItem[];
}

export interface TransactionsHistory {
  [date: string]: HistoryItem;
}
