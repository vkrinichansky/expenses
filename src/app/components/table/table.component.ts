import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TablesTitlesEnum, TablesTypesEnum, WordsEnum } from '../../consts';
import { TableItem } from '../../types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from '../../services/state-service/state.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  tableTitles = TablesTitlesEnum;
  tableTypes = TablesTypesEnum;
  words = WordsEnum;

  @Input() tableTitle: TablesTitlesEnum;
  @Input() tableType: TablesTypesEnum;

  tableData$: Observable<TableItem[]>;
  tableSumItem$: Observable<TableItem>;

  constructor(private appDataService: StateService) {}

  ngOnInit() {
    this.tableData$ =
      this.tableType === this.tableTypes.Expenses
        ? this.appDataService.expenses$
        : this.appDataService.income$;

    this.tableSumItem$ = this.tableData$.pipe(
      map((data) => ({
        name: this.words.Total,
        value: this.calcSum(data),
      }))
    );
  }

  private calcSum(data: TableItem[]): number {
    return data.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0
    );
  }
}
