import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { StateService } from '../../services/state-service/state.service';
import { DictionaryEnum } from '../../consts';
import { BehaviorSubject } from 'rxjs';

enum FlowsEnum {
  ResetTables = 'Reset Tables',
  ResetBalance = 'Reset Balance',
  CleanHistory = 'Clean History',
  CleanMonthlyHistory = 'Clean Monthly History',
}

@Component({
  selector: 'app-data-controls',
  templateUrl: './data-reset.component.html',
  styleUrls: ['./data-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataResetComponent implements OnDestroy {
  dictionary = DictionaryEnum;
  flows = FlowsEnum;

  isConfirmationOpen$ = new BehaviorSubject(false);
  flow$ = new BehaviorSubject<FlowsEnum | undefined>(undefined);

  constructor(private appDataService: StateService) {}

  ngOnDestroy(): void {
    this.isConfirmationOpen$.complete();
    this.flow$.complete();
  }

  openConfirmation(flow: FlowsEnum): void {
    this.isConfirmationOpen$.next(true);
    this.flow$.next(flow);
  }

  closeConfirmation(): void {
    this.isConfirmationOpen$.next(false);
  }

  resolveAction(): void {
    switch (this.flow$.getValue()) {
      case FlowsEnum.ResetTables:
        this.resetTables();
        break;
      case FlowsEnum.ResetBalance:
        this.resetBalance();
        break;
      case FlowsEnum.CleanHistory:
        this.resetHistory();
        break;
      case FlowsEnum.CleanMonthlyHistory:
        this.resetMonthlyHistory();
        break;
    }
    this.closeConfirmation();
  }

  private resetTables(): void {
    this.appDataService.resetTables();
  }

  private resetBalance(): void {
    this.appDataService.resetBalance();
  }

  private resetHistory(): void {
    this.appDataService.resetDailyHistory();
  }

  private resetMonthlyHistory(): void {
    this.appDataService.resetMonthlyHistory();
  }
}
