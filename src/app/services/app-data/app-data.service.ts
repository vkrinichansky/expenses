import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { emptyData, emptyHistoryItem, TablesTypesEnum } from '../../consts';
import { AppData, DailyHistory, MonthlyHistory, TableItem } from '../../types';
import {
  addValueToDefiniteCategory,
  addValueToDefiniteCategoryInDailyHistory,
  createNewTableItem,
  getCurrentDate,
} from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  // expenses state
  private _expenses$: BehaviorSubject<TableItem[]> = new BehaviorSubject<
    TableItem[]
  >([]);

  get expenses$(): Observable<TableItem[]> {
    return this._expenses$;
  }

  get expenses(): TableItem[] {
    return this._expenses$.getValue();
  }

  set expenses(expenses: TableItem[]) {
    this._expenses$.next(expenses);
  }

  // income state
  private _income$: BehaviorSubject<TableItem[]> = new BehaviorSubject<
    TableItem[]
  >([]);

  get income$(): Observable<TableItem[]> {
    return this._income$;
  }

  get income(): TableItem[] {
    return this._income$.getValue();
  }

  set income(expenses: TableItem[]) {
    this._income$.next(expenses);
  }

  // balance state
  private _balance$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get balance$(): Observable<number> {
    return this._balance$;
  }

  get balance(): number {
    return this._balance$.getValue();
  }

  set balance(balance: number) {
    this._balance$.next(balance);
  }

  // monthlyHistory state
  private _monthlyHistory$: BehaviorSubject<MonthlyHistory> =
    new BehaviorSubject<MonthlyHistory>({});

  get monthlyHistory$(): Observable<MonthlyHistory> {
    return this._monthlyHistory$;
  }

  get monthlyHistory(): MonthlyHistory {
    return this._monthlyHistory$.getValue();
  }

  set monthlyHistory(history: MonthlyHistory) {
    this._monthlyHistory$.next(history);
  }

  // dailyHistory state
  private _dailyHistory$: BehaviorSubject<DailyHistory> =
    new BehaviorSubject<DailyHistory>({});

  get dailyHistory$(): Observable<DailyHistory> {
    return this._dailyHistory$;
  }

  get dailyHistory(): DailyHistory {
    return this._dailyHistory$.getValue();
  }

  set dailyHistory(history: DailyHistory) {
    this._dailyHistory$.next(history);
  }

  private _appData$: BehaviorSubject<AppData> = new BehaviorSubject<AppData>(
    emptyData
  );

  get appData(): AppData {
    return this._appData$.getValue();
  }

  set appData(data: AppData) {
    this._appData$.next(data);
  }

  get appData$(): Observable<AppData> {
    return this._appData$;
  }

  get expensesSum(): number {
    return this.expenses.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0
    );
  }

  get incomeSum(): number {
    return this.income.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0
    );
  }

  addCategory(category: string, table: TablesTypesEnum): void {
    this[table] = [...this[table], createNewTableItem(category)];
    this.setDataToStorage();
  }

  removeCategory(category: string, table: TablesTypesEnum): void {
    this[table] = [...this[table].filter((item) => item.name !== category)];
    this.setDataToStorage();
  }

  addValueToCategory(
    value: number,
    table: TablesTypesEnum,
    category: string
  ): void {
    this[table] = [
      ...this[table].map((item) =>
        addValueToDefiniteCategory(item, category, value)
      ),
    ];
    this.resolveBalanceOperation(table, value);
    this.resolveAddedItemsHistory(table, category, value);

    this.setDataToStorage();
  }

  private resolveBalanceOperation(table: TablesTypesEnum, value: number): void {
    switch (table) {
      case TablesTypesEnum.Expenses:
        this.balance -= value;
        break;
      case TablesTypesEnum.Income:
        this.balance += value;
        break;
    }
  }

  resolveAddedItemsHistory(
    table: TablesTypesEnum,
    category: string,
    value: number
  ): void {
    const currentDate = getCurrentDate();

    if (currentDate in this.dailyHistory) {
      const foundItem = this.dailyHistory[currentDate][table].find(
        (item) => item.categoryName === category
      );
      if (foundItem) {
        this.addValueToExistingCategoryInDailyHistory(
          currentDate,
          table,
          category,
          value
        );
      } else {
        this.addNewCategoryToDailyHistory(currentDate, table, category, value);
      }
    } else {
      this.addNewDateAndCategoryToDailyHistory(
        currentDate,
        table,
        category,
        value
      );
    }
  }

  private addValueToExistingCategoryInDailyHistory(
    currentDate: string,
    table: TablesTypesEnum,
    category: string,
    value: number
  ): void {
    this.dailyHistory = {
      ...this.dailyHistory,
      [currentDate]: {
        ...this.dailyHistory[currentDate],
        [table]: [
          ...this.dailyHistory[currentDate][table].map((item) =>
            addValueToDefiniteCategoryInDailyHistory(item, category, value)
          ),
        ],
      },
    };
  }

  private addNewCategoryToDailyHistory(
    currentDate: string,
    table: TablesTypesEnum,
    category: string,
    value: number
  ): void {
    this.dailyHistory = {
      ...this.dailyHistory,
      [currentDate]: {
        ...this.dailyHistory[currentDate],
        [table]: [
          ...this.dailyHistory[currentDate][table],
          {
            value: value,
            categoryName: category,
          },
        ],
      },
    };
  }

  private addNewDateAndCategoryToDailyHistory(
    currentDate: string,
    table: TablesTypesEnum,
    category: string,
    value: number
  ): void {
    this.dailyHistory = {
      ...this.dailyHistory,
      [currentDate]: emptyHistoryItem,
    };
    this.addNewCategoryToDailyHistory(currentDate, table, category, value);
  }

  resetTables(): void {
    const tables = [TablesTypesEnum.Expenses, TablesTypesEnum.Income];

    tables.forEach((table) => {
      this[table] = [
        ...this[table].map((category) => {
          category.value = 0;
          return { ...category };
        }),
      ];
    });

    this.setDataToStorage();
  }

  resetBalance(): void {
    this.balance = 0;
  }

  resetHistory(): void {
    this.dailyHistory = {};
    this.setDataToStorage();
  }

  resetMonthlyHistory(): void {
    this.monthlyHistory = {};
    this.setDataToStorage();
  }

  monthlyReset(dateKey: string): void {
    this.monthlyHistory = {
      ...this.monthlyHistory,
      [dateKey]: {
        expenses: this.expensesSum,
        income: this.incomeSum,
        balance: this.balance,
      },
    };
    this.setDataToStorage();
  }

  // Storage operations
  getDataFromStorage(): void {
    const state: AppData = JSON.parse(
      localStorage.getItem('appData') as string
    );
    this.appData = JSON.parse(localStorage.getItem('appData') as string);
    if ('expenses' in state) {
      this.expenses = state.expenses;
    } else {
      this.expenses = [];
    }

    if ('income' in state) {
      this.income = state.income;
    } else {
      this.income = [];
    }

    if ('balance' in state) {
      this.balance = state.balance;
    } else {
      this.balance = 0;
    }

    if ('monthlyHistory' in state) {
      this.monthlyHistory = state.monthlyHistory;
    } else {
      this.monthlyHistory = {};
    }

    if ('dailyHistory' in state) {
      this.dailyHistory = state.dailyHistory;
    } else {
      this.dailyHistory = {};
    }
  }

  setDataToStorage(): void {
    const state: AppData = {
      expenses: this.expenses,
      income: this.income,
      balance: this.balance,
      monthlyHistory: this.monthlyHistory,
      dailyHistory: this.dailyHistory,
    };
    localStorage.setItem('appData', JSON.stringify(state));
  }
}
