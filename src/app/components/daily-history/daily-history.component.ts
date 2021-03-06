import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DailyHistory } from '../../types';
import { TablesTitlesEnum, TablesTypesEnum, WordsEnum } from '../../consts';
import { StateService } from '../../services/state-service/state.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-daily-history',
  templateUrl: './daily-history.component.html',
  styleUrls: ['./daily-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyHistoryComponent implements OnInit {
  tableTitles = TablesTitlesEnum;
  tableTypes = TablesTypesEnum;
  words = WordsEnum;

  historyDates$: Observable<string[]>;
  history$: Observable<DailyHistory>;

  constructor(private appDataService: StateService) {}

  ngOnInit() {
    this.history$ = this.appDataService.dailyHistory$;
    this.historyDates$ = this.history$.pipe(
      map((history) => Object.keys(history))
    );
  }
}
