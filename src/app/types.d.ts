interface TableItem {
  name: string;
  value: number;
}

interface AppData {
  expenses: TableItem[];
  income: TableItem[];
  balance: number;
  history: TransactionsHistory;
}

interface TransactionsHistory {
  [date: string]: {
    [table: string]: {
      [category: string]: number;
    };
  };
}
