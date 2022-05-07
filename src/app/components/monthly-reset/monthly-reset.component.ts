import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { getDateKey } from 'src/app/utils';
import { DictionaryEnum } from '../../consts';
import { StateService } from '../../services/state-service/state.service';

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

  @HostListener('click')
  monthlyReset(): void {
    this.appDataService.monthlyReset(getDateKey(this.date));
  }
}
