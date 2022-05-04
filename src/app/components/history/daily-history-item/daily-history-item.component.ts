import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DailyHistory } from '../../../types';
import { TablesTitlesEnum, TablesTypesEnum } from '../../../consts';

@Component({
  selector: 'app-daily-history-item',
  templateUrl: './daily-history-item.component.html',
  styleUrls: ['./daily-history-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyHistoryItemComponent {
  tableTypes = TablesTypesEnum;
  tableTitles = TablesTitlesEnum;

  @Input()
  history: DailyHistory;

  @Input()
  date: string;
}
