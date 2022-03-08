import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppDataService } from './services/app-data/app-data.service';
import { TablesTitlesEnum, TablesTypesEnum, WordsEnum } from './consts';
import { BehaviorSubject } from 'rxjs';
import { getDateKey } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  tablesTitlesEnum = TablesTitlesEnum;
  tablesTypesEnum = TablesTypesEnum;
  words = WordsEnum;

  title = 'expenses';

  isMessageShown$ = new BehaviorSubject(false);
  date: Date;

  constructor(private appDataService: AppDataService) {}

  ngOnInit() {
    this.appDataService.getDataFromStorage();
    this.date = new Date();

    if (this.shouldDoMonthlyReset(this.date)) {
      this.isMessageShown$.next(true);
    }
  }

  ngOnDestroy() {
    this.appDataService.setDataToStorage();
  }

  reset(): void {
    this.appDataService.monthlyReset(getDateKey(this.date));
    this.isMessageShown$.next(false);
  }

  private shouldDoMonthlyReset(date: Date): boolean {
    const day = date.getDate();
    return (
      day >= 1 && !(getDateKey(date) in this.appDataService.monthlyHistory)
    );
  }
}
