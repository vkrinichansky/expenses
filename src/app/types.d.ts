import { TablesTypesEnum } from './consts';

export interface TableItem {
  name: string;
  value: number;
}

export interface AppData {
  expenses: TableItem[];
  income: TableItem[];
  balance: number;
  dailyHistory: DailyHistory;
  monthlyHistory: MonthlyHistory;
}

export interface DailyHistoryCategoryItem {
  categoryName: string;
  value: number;
}

export interface DailyHistoryItem {
  [TablesTypesEnum.Expenses]: DailyHistoryCategoryItem[];
  [TablesTypesEnum.Income]: DailyHistoryCategoryItem[];
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
