import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DictionaryEnum } from '../../consts';
import { StateService } from '../../services/state-service/state.service';
import { getDateKey } from '../../utils';

@Component({
  selector: 'app-monthly-reset',
  templateUrl: './monthly-reset.component.html',
  styleUrls: ['./monthly-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlyResetComponent {
  dictionary = DictionaryEnum;

  @Input()
  date: Date;

  constructor(private appDataService: StateService) {}

  monthlyReset(): void {
    this.appDataService.monthlyReset(getDateKey(this.date));
  }
}
