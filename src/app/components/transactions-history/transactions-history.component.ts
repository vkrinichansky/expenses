import { Component, OnInit } from '@angular/core';
import { TransactionsHistory } from '../../types';
import { TablesTitlesEnum, TablesTypesEnum, WordsEnum } from '../../consts';
import { AppDataService } from '../../services/app-data/app-data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
})
export class TransactionsHistoryComponent implements OnInit {
  tableTitles = TablesTitlesEnum;
  tableTypes = TablesTypesEnum;
  words = WordsEnum;

  historyDates$: Observable<string[]>;
  history$: Observable<TransactionsHistory>;

  constructor(private appDataService: AppDataService) {}

  ngOnInit() {
    this.history$ = this.appDataService.history$;
    this.historyDates$ = this.appDataService.history$.pipe(
      map((history) => Object.keys(history))
    );
  }
}
