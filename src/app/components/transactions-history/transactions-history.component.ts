import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Record, TransactionsHistory } from '../../types';
import { TablesTitlesEnum, TableTypesEnum, WordsEnum } from '../../consts';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
})
export class TransactionsHistoryComponent implements OnChanges {
  @Input()
  history: TransactionsHistory;

  tableTitles = TablesTitlesEnum;
  tableTypes = TableTypesEnum;
  words = WordsEnum;

  historyRecords: Record[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if ('history' in changes) {
      for (let key in this.history) {
        this.historyRecords.push({
          date: key,
          record: this.history[key],
        });
      }
    }
  }
}
