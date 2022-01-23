import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  emptyData,
  emptyHistoryItem,
  FormModesEnum,
  TableTypesEnum,
} from '../../consts';
import { AppData, TableItem } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  appData$: BehaviorSubject<AppData> = new BehaviorSubject<AppData>(emptyData);

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
    console.log(this.appData);
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

    this.resolveAddedItemsHistory(table, category, value);
    console.log(this.appData.history);
    this.setDataToStorage();
  }

  editValueOfCategory(
    previousValue: number,
    currentValue: number,
    table: TableTypesEnum,
    category: string
  ): void {
    this.appData[table].map((item) => {
      if (item.name === category) {
        item.value = currentValue;
      }
    });

    this.resolveEditedItemsHistory(
      table,
      category,
      previousValue,
      currentValue
    );
    console.log(this.appData.history);
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
    if (this.appData.expenses) {
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
    return 0;
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

  resolveAddedItemsHistory(
    table: TableTypesEnum,
    category: string,
    value: number
  ): void {
    const currentDate = new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    if (this.appData.history.hasOwnProperty(currentDate)) {
      const foundItem = this.appData.history[currentDate][table][
        FormModesEnum.Add
      ].find((item) => item.category === category);

      if (foundItem) {
        this.appData.history[currentDate][table][FormModesEnum.Add].map(
          (item) => {
            if (item.category === category) {
              item.value += value;
            }
          }
        );
      } else {
        this.appData.history[currentDate][table][FormModesEnum.Add].push({
          value: value,
          category: category,
        });
      }
    } else {
      this.appData.history[currentDate] = emptyHistoryItem;
      this.appData.history[currentDate][table][FormModesEnum.Add] = [
        {
          value: value,
          category: category,
        },
      ];
    }
  }

  resolveEditedItemsHistory(
    table: TableTypesEnum,
    category: string,
    previousValue: number,
    currentValue: number
  ): void {
    const currentDate = new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    if (this.appData.history.hasOwnProperty(currentDate)) {
      const foundItem = this.appData.history[currentDate][table][
        FormModesEnum.Edit
      ].find((item) => item.category === category);

      if (foundItem) {
        this.appData.history[currentDate][table][FormModesEnum.Edit].map(
          (item) => {
            if (item.category === category) {
              item.previousValue = previousValue;
              item.currentValue = currentValue;
            }
          }
        );
      } else {
        this.appData.history[currentDate][table][FormModesEnum.Edit].push({
          previousValue: previousValue,
          currentValue: currentValue,
          category: category,
        });
      }
    } else {
      this.appData.history[currentDate] = emptyHistoryItem;
      this.appData.history[currentDate][table][FormModesEnum.Edit] = [
        {
          previousValue: previousValue,
          currentValue: currentValue,
          category: category,
        },
      ];
    }
  }
}
