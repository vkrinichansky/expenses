import { Component, OnInit } from '@angular/core';
import { DailyHistory } from '../../types';
import { TablesTitlesEnum, TablesTypesEnum, WordsEnum } from '../../consts';
import { AppDataService } from '../../services/app-data/app-data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-daily-history',
  templateUrl: './daily-history.component.html',
  styleUrls: ['./daily-history.component.scss'],
})
export class DailyHistoryComponent implements OnInit {
  tableTitles = TablesTitlesEnum;
  tableTypes = TablesTypesEnum;
  words = WordsEnum;

  historyDates$: Observable<string[]>;
  history$: Observable<DailyHistory>;

  constructor(private appDataService: AppDataService) {}

  ngOnInit() {
    this.history$ = this.appDataService.history$;
    this.historyDates$ = this.history$.pipe(
      map((history) => Object.keys(history))
    );
  }
}
