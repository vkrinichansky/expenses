import { Component, Input } from '@angular/core';
import { Record } from '../../types';
import { TablesTitlesEnum, TableTypesEnum, WordsEnum } from '../../consts';

@Component({
  selector: 'app-transaction-record',
  templateUrl: './transaction-record.component.html',
  styleUrls: ['./transaction-record.component.scss'],
})
export class TransactionRecordComponent {
  words = WordsEnum;

  @Input()
  tableTitle: TablesTitlesEnum;

  @Input()
  tableType: TableTypesEnum;

  @Input()
  record: Record;
}
