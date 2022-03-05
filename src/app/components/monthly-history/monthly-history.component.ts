import { Component, OnInit } from '@angular/core';
import { TablesTitlesEnum, WordsEnum } from '../../consts';
import { Observable } from 'rxjs';
import { AppDataService } from '../../services/app-data/app-data.service';
import { map } from 'rxjs/operators';
import { MonthlyHistory } from '../../types';

@Component({
  selector: 'app-monthly-history',
  templateUrl: './monthly-history.component.html',
  styleUrls: ['./monthly-history.component.scss'],
})
export class MonthlyHistoryComponent implements OnInit {
  words = WordsEnum;
  tableTitles = TablesTitlesEnum;

  historyDates$: Observable<string[]>;
  history$: Observable<MonthlyHistory>;

  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {
    this.history$ = this.appDataService.monthlyHistory$;
    this.historyDates$ = this.history$.pipe(
      map((monthlyHistory) => Object.keys(monthlyHistory))
    );
  }

  formatDate(date: string): string {
    return date.substr(0, 1).toUpperCase() + date.substr(1);
  }

  getMonthColor(date: string): string {
    const month = date.split(' ')[0];
    switch (month) {
      case 'декабрь':
      case 'январь':
      case 'февраль':
        return 'text-blue';
      case 'март':
      case 'апрель':
      case 'май':
        return 'text-green';
      case 'июнь':
      case 'июль':
      case 'август':
        return 'text-orange';
      case 'сентябрь':
      case 'октябрь':
      case 'ноябрь':
        return 'text-red';
      default:
        return '';
    }
  }
}
