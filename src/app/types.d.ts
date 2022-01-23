import { FormModesEnum, TableTypesEnum } from './consts';

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

export interface EditedHistoryItem {
  category: string;
  previousValue: number;
  currentValue: number;
}

export interface HistoryItem {
  [TableTypesEnum.Expenses]: {
    [FormModesEnum.Add]: AddedHistoryItem[];
    [FormModesEnum.Edit]: EditedHistoryItem[];
  };
  [TableTypesEnum.Income]: {
    [FormModesEnum.Add]: AddedHistoryItem[];
    [FormModesEnum.Edit]: EditedHistoryItem[];
  };
}

export interface TransactionsHistory {
  [date: string]: HistoryItem;
}

interface Record {
  date: string;
  record: HistoryItem;
}
