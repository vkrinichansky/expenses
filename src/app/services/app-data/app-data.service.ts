import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  appData$: BehaviorSubject<AppData> = new BehaviorSubject<AppData>({
    expenses: [],
    income: [],
    balance: 0,
  });

  get appData(): AppData {
    return this.appData$.getValue();
  }

  set appData(data: AppData) {
    this.appData$.next(data);
  }

  constructor() {}

  addCategory(category: string, table: 'expenses' | 'income'): void {
    const newItem: TableItem = {
      name: category,
      value: 0,
    };
    this.appData[table].push(newItem);
    this.setDataToStorage();
  }

  removeCategory(category: string, table: 'expenses' | 'income'): void {
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
    table: 'expenses' | 'income',
    category: string
  ): void {
    this.appData[table].map((item) => {
      if (item.name === category) {
        item.value += value;
      }
    });
    this.setDataToStorage();
  }

  editValueOfCategory(
    value: number,
    table: 'expenses' | 'income',
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
    for (let i = 0; i < this.appData.expenses.length; i++) {
      this.appData.expenses[i].value = 0;
    }
    for (let i = 0; i < this.appData.income.length; i++) {
      this.appData.income[i].value = 0;
    }
    this.setDataToStorage();
  }

  resetBalance(): void {
    this.appData.balance = 0;
    this.setDataToStorage();
  }

  calcBalance(): number {
    let expensesSum = 0;
    let incomeSum = 0;
    for (let i = 0; i < this.appData.expenses.length; i++) {
      expensesSum += this.appData.expenses[i].value;
    }
    for (let i = 0; i < this.appData.income.length; i++) {
      incomeSum += this.appData.income[i].value;
    }
    return this.appData.balance + incomeSum - expensesSum;
  }

  getDataFromStorage(): void {
    this.appData = JSON.parse(localStorage.getItem('appData') as string);
  }

  setDataToStorage(): void {
    localStorage.setItem('appData', JSON.stringify(this.appData));
  }
}
