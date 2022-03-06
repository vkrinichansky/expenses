import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DailyHistoryCategoryItem } from '../../../types';
import { TablesTitlesEnum, TablesTypesEnum, WordsEnum } from '../../../consts';

@Component({
  selector: 'app-daily-history-item',
  templateUrl: './daily-history-item.component.html',
  styleUrls: ['./daily-history-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyHistoryItemComponent {
  words = WordsEnum;
  tableTypes = TablesTypesEnum;

  @Input()
  tableTitle: TablesTitlesEnum;

  @Input()
  tableType: TablesTypesEnum;

  @Input()
  items: DailyHistoryCategoryItem[];

  @Input()
  date: string;
}
