interface TableItem {
  name: string;
  value: number;
}

interface AppData {
  expenses: TableItem[];
  income: TableItem[];
  balance: number;
  history: HistoryItem[];
}

interface HistoryItem {
  date: object;
}
