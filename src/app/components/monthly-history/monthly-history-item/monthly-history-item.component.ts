import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MonthlyHistory } from '../../../types';
import { TablesTitlesEnum, WordsEnum } from '../../../consts';

@Component({
  selector: 'app-monthly-history-item',
  templateUrl: './monthly-history-item.component.html',
  styleUrls: ['./monthly-history-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlyHistoryItemComponent {
  words = WordsEnum;
  tableTitles = TablesTitlesEnum;

  @Input()
  history: MonthlyHistory;

  @Input()
  date: string;

  formatDate(date: string): string {
    return date.substr(0, 1).toUpperCase() + date.substr(1);
  }

  getMonthColor(date: string): string {
    const month = date.split(' ')[0];
    switch (month) {
      case 'декабрь':
      case 'январь':
      case 'февраль':
        return 'text-blue';
      case 'март':
      case 'апрель':
      case 'май':
        return 'text-dark-green';
      case 'июнь':
      case 'июль':
      case 'август':
        return 'text-orange';
      case 'сентябрь':
      case 'октябрь':
      case 'ноябрь':
        return 'text-red';
      default:
        return '';
    }
  }
}
