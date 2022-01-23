import { Component, Input } from '@angular/core';
import { Record, TransactionsHistory } from '../../types';
import { TablesTitlesEnum, TableTypesEnum, WordsEnum } from '../../consts';
import { AppDataService } from '../../services/app-data/app-data.service';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
})
export class TransactionsHistoryComponent {
  @Input()
  history: TransactionsHistory;

  tableTitles = TablesTitlesEnum;
  tableTypes = TableTypesEnum;
  words = WordsEnum;

  historyRecords: Record[] = [];

  constructor(private appDataService: AppDataService) {}

  resolveHistory(): Record[] {
    this.historyRecords = [];
    for (let key in this.history) {
      this.historyRecords.push({
        date: key,
        record: this.history[key],
      });
    }
    return this.historyRecords;
  }

  cleanHistory(): void {
    this.appDataService.cleanHistory();
  }
}
