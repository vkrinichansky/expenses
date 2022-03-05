import { TablesTypesEnum } from './consts';

export interface TableItem {
  name: string;
  value: number;
}

export interface AppData {
  expenses: TableItem[];
  income: TableItem[];
  balance: number;
  history: DailyHistory;
  monthlyHistory: MonthlyHistory;
}

export interface HistoryCategoryItem {
  categoryName: string;
  value: number;
}

export interface DailyHistoryItem {
  [TablesTypesEnum.Expenses]: HistoryCategoryItem[];
  [TablesTypesEnum.Income]: HistoryCategoryItem[];
}

export interface DailyHistory {
  [date: string]: DailyHistoryItem;
}

export interface MonthlyHistoryItem {
  expenses: number;
  income: number;
  balance: number;
}

export interface MonthlyHistory {
  [date: string]: MonthlyHistoryItem;
}
