import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { emptyData, emptyHistoryItem, TablesTypesEnum } from '../../consts';
import { AppData, TableItem, TransactionsHistory } from '../../types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
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

  set balance(balance: number) {
    this.appData = {
      ...this.appData,
      balance: balance,
    };
    this.setDataToStorage();
  }

  get balance(): number {
    return this.appData.balance;
  }

  get expensesSum(): number {
    return this.appData.expenses.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0
    );
  }

  get incomeSum(): number {
    return this.appData.income.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0
    );
  }

  get balance$(): Observable<number> {
    return this.appData$.pipe(map((data) => data.balance));
  }

  get expenses$(): Observable<TableItem[]> {
    return this.appData$.pipe(map((data) => data.expenses));
  }

  get income$(): Observable<TableItem[]> {
    return this.appData$.pipe(map((data) => data.income));
  }

  get history$(): Observable<TransactionsHistory> {
    return this.appData$.pipe(map((data) => data.history));
  }

  addCategory(category: string, table: TablesTypesEnum): void {
    this.appData = {
      ...this.appData,
      [table]: [...this.appData[table], this.createNewTableItem(category)],
    };
    this.setDataToStorage();
  }

  removeCategory(category: string, table: TablesTypesEnum): void {
    this.appData = {
      ...this.appData,
      [table]: this.appData[table].filter((item) => item.name !== category),
    };
    this.setDataToStorage();
  }

  addValueToCategory(
    value: number,
    table: TablesTypesEnum,
    category: string
  ): void {
    this.appData[table].map((item) => {
      if (item.name === category) {
        item.value += value;
      }
    });

    this.resolveAddedItemsHistory(table, category, value);
    if (table === TablesTypesEnum.Expenses) {
      this.balance -= value;
    } else {
      this.balance += value;
    }
    this.setDataToStorage();
  }

  resolveAddedItemsHistory(
    table: TablesTypesEnum,
    category: string,
    value: number
  ): void {
    const currentDate = this.getCurrentDate();

    if (currentDate in this.appData.history) {
      const foundItem = this.appData.history[currentDate][table].find(
        (item) => item.categoryName === category
      );
      if (foundItem) {
        this.appData.history[currentDate][table].map((item) => {
          if (item.categoryName === category) {
            item.value += value;
          }
        });
      } else {
        this.appData.history[currentDate][table].push({
          value: value,
          categoryName: category,
        });
      }
    } else {
      this.appData.history[currentDate] = emptyHistoryItem;
      this.appData.history[currentDate][table].push({
        value: value,
        categoryName: category,
      });
    }
  }

  resetTables(): void {
    this.appData = {
      ...this.appData,
      expenses: this.appData.expenses.map((category) => {
        category.value = 0;
        return category;
      }),
      income: this.appData.income.map((category) => {
        category.value = 0;
        return category;
      }),
    };
    this.setDataToStorage();
  }

  resetBalance(): void {
    this.balance = 0;
  }

  resetHistory(): void {
    this.appData = {
      ...this.appData,
      history: {},
    };
    this.setDataToStorage();
  }

  resetMonthlyHistory(): void {
    this.appData = {
      ...this.appData,
      monthlyHistory: {},
    };
    this.setDataToStorage();
  }

  monthlyReset(dateKey: string): void {
    this.appData.monthlyHistory[dateKey] = {
      expenses: this.expensesSum,
      income: this.incomeSum,
      balance: this.balance,
    };
    this.setDataToStorage();
  }

  getDataFromStorage(): void {
    this.appData = JSON.parse(localStorage.getItem('appData') as string);
    if (!this.appData) {
      this.appData = emptyData;
    }
  }

  setDataToStorage(): void {
    localStorage.setItem('appData', JSON.stringify(this.appData));
  }

  private createNewTableItem(category: string): TableItem {
    return {
      name: category,
      value: 0,
    };
  }

  private getCurrentDate(): string {
    return new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
