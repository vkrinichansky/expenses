import { Component, OnInit } from '@angular/core';
import { Record, TransactionsHistory } from '../../types';
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
  historyRecords$: Observable<Record[]>;

  tableTitles = TablesTitlesEnum;
  tableTypes = TablesTypesEnum;
  words = WordsEnum;

  constructor(private appDataService: AppDataService) {}

  ngOnInit() {
    this.historyRecords$ = this.appDataService.history$.pipe(
      map((history) => this.resolveHistory(history))
    );
  }

  resolveHistory(history: TransactionsHistory): Record[] {
    const historyRecords = [];
    for (let key in history) {
      historyRecords.push({
        date: key,
        record: history[key],
      });
    }
    return historyRecords;
  }
}
