import { DailyHistory } from './../../types.d';
import { Component, Input, OnInit } from '@angular/core';
import { HistoryTypesEnum, WordsEnum } from '../../consts';
import { Observable } from 'rxjs';
import { StateService } from '../../services/state-service/state.service';
import { map } from 'rxjs/operators';
import { MonthlyHistory } from '../../types';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  words = WordsEnum;
  historyTypes = HistoryTypesEnum;

  @Input()
  historyType: HistoryTypesEnum;

  historyDates$: Observable<string[]>;
  history$: Observable<DailyHistory | MonthlyHistory>;

  constructor(private appDataService: StateService) {}

  ngOnInit(): void {
    this.history$ =
      this.historyType === HistoryTypesEnum.Daily
        ? this.appDataService.dailyHistory$
        : this.appDataService.monthlyHistory$;
    this.historyDates$ = this.history$.pipe(map((history) => Object.keys(history)));
  }
}
