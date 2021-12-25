import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableTypesEnum } from '../../consts';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  appData$: BehaviorSubject<AppData> = new BehaviorSubject<AppData>({
    expenses: [],
    income: [],
    balance: 0,
    history: {},
  });

  get appData(): AppData {
    return this.appData$.getValue();
  }

  set appData(data: AppData) {
    this.appData$.next(data);
  }

  addCategory(category: string, table: TableTypesEnum): void {
    const newItem: TableItem = {
      name: category,
      value: 0,
    };
    this.appData[table].push(newItem);
    this.setDataToStorage();
  }

  removeCategory(category: string, table: TableTypesEnum): void {
    this.appData[table] = this.appData[table].filter(
      (item) => item.name !== category
    );
    this.setDataToStorage();
  }

  setBalance(balance: number): void {
    this.appData.balance = balance;
    this.setDataToStorage();
  }

  addValueToCategory(
    value: number,
    table: TableTypesEnum,
    category: string
  ): void {
    this.appData[table].map((item) => {
      if (item.name === category) {
        item.value += value;
      }
    });

    this.resolveTransactionHistory(table, category, value);
    this.setDataToStorage();
  }

  editValueOfCategory(
    value: number,
    table: TableTypesEnum,
    category: string
  ): void {
    this.appData[table].map((item) => {
      if (item.name === category) {
        item.value = value;
      }
    });
    this.setDataToStorage();
  }

  resetTables(): void {
    this.appData.balance = this.calcBalance();
    this.appData.expenses.forEach((category) => (category.value = 0));
    this.appData.income.forEach((category) => (category.value = 0));
    this.setDataToStorage();
  }

  resetBalance(): void {
    this.appData.balance = 0;
    this.setDataToStorage();
  }

  calcBalance(): number {
    const expensesSum = this.appData.expenses.reduce(
      (result, currentValue) => result + currentValue.value,
      0
    );
    const incomeSum = this.appData.income.reduce(
      (result, currentValue) => result + currentValue.value,
      0
    );
    return this.appData.balance + incomeSum - expensesSum;
  }

  getDataFromStorage(): void {
    this.appData = JSON.parse(localStorage.getItem('appData') as string);
    if (!this.appData) {
      this.appData = {
        balance: 0,
        income: [],
        expenses: [],
        history: {},
      };
    }
  }

  setDataToStorage(): void {
    localStorage.setItem('appData', JSON.stringify(this.appData));
  }

  private resolveTransactionHistory(
    table: TableTypesEnum,
    category: string,
    value: number
  ) {
    const currentDate = new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    if (currentDate in this.appData?.history) {
      if (table in this.appData.history[currentDate]) {
        if (category in this.appData.history?.[currentDate][table]) {
          this.appData.history[currentDate][table][category] += value;
        } else {
          this.appData.history[currentDate][table][category] = value;
        }
      } else {
        this.appData.history[currentDate][table] = {
          [category]: value,
        };
      }
    } else {
      this.appData.history[currentDate] = {
        [table]: {
          [category]: value,
        },
      };
    }
  }
}
