import { Component, Input } from '@angular/core';
import { HistoryCategoryItem } from '../../types';
import { TablesTitlesEnum, TablesTypesEnum, WordsEnum } from '../../consts';

@Component({
  selector: 'app-transaction-record',
  templateUrl: './transaction-record.component.html',
  styleUrls: ['./transaction-record.component.scss'],
})
export class TransactionRecordComponent {
  words = WordsEnum;
  tableTypes = TablesTypesEnum;

  @Input()
  tableTitle: TablesTitlesEnum;

  @Input()
  tableType: TablesTypesEnum;

  @Input()
  items: HistoryCategoryItem[];
}
