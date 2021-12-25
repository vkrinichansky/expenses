import { Component, Input } from '@angular/core';
import { TablesTitlesEnum, TableTypesEnum, WordsEnum } from '../../consts';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tableTitle: TablesTitlesEnum;
  @Input() data: TableItem[];
  tableTitles = TablesTitlesEnum;
  tableTypes = TableTypesEnum;
  words = WordsEnum;

  calcSum(): number {
    let totalSum = 0;
    for (let i = 0; i < this.data.length; i++) {
      totalSum += this.data[i].value;
    }
    return totalSum;
  }
}
