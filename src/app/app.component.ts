import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppDataService } from './services/app-data/app-data.service';
import { TablesTitlesEnum, TablesTypesEnum } from './consts';
import { AppData } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  tablesTitlesEnum = TablesTitlesEnum;
  tablesTypesEnum = TablesTypesEnum;

  title = 'expenses';

  get appData(): AppData {
    return this.appDataService.appData;
  }

  constructor(private appDataService: AppDataService) {}

  ngOnInit() {
    const date = new Date();
  }

  ngOnDestroy() {
    this.appDataService.setDataToStorage();
  }

  shouldDoMonthlyReset(date: Date): boolean {
    const day = date.getDate();
    return (
      day >= 1 &&
      !(this.getDateKey(date) in this.appDataService.appData.monthlyHistory)
    );
  }

  getDateKey(date: Date): string {
    const previousDate = new Date(date.getFullYear(), date.getMonth() - 1);
    return previousDate.toLocaleDateString('ru-RU', {
      month: 'long',
      year: 'numeric',
    });
  }
}
