import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DailyHistory, DailyHistoryCategoryItem } from '../../../types';
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
  tableTitles = TablesTitlesEnum;

  @Input()
  history: DailyHistory;

  @Input()
  date: string;
}
