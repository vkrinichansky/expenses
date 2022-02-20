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

  get balance() {
    return this.appData.balance;
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
    console.log(table, category, value);
    const currentDate = this.getCurrentDate();

    if (currentDate in this.appData.history) {
      if (this.appData.history[currentDate][table].length) {
        this.appData.history[currentDate][table].map((item) => {
          if (item.category === category) {
            item.value += value;
          }
        });
      } else {
        this.appData.history[currentDate][table].push({
          value: value,
          category: category,
        });
      }
    } else {
      this.appData.history[currentDate] = emptyHistoryItem;
      this.appData.history[currentDate][table].push({
        value: value,
        category: category,
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
