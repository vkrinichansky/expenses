import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppDataService } from '../../services/app-data/app-data.service';
import { WordsEnum } from '../../consts';
import { BehaviorSubject } from 'rxjs';

enum FlowEnum {
  ResetTables = 'Reset Tables',
  ResetBalance = 'Reset Balance',
  CleanHistory = 'Clean History',
  CleanMonthlyHistory = 'Clean Monthly History',
}

@Component({
  selector: 'app-data-controls',
  templateUrl: './data-controls.component.html',
  styleUrls: ['./data-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataControlsComponent {
  words = WordsEnum;
  flows = FlowEnum;

  isConfirmationOpen$ = new BehaviorSubject(false);
  flow$ = new BehaviorSubject<FlowEnum | undefined>(undefined);

  constructor(private appDataService: AppDataService) {}

  openConfirmation(flow: FlowEnum): void {
    this.isConfirmationOpen$.next(true);
    this.flow$.next(flow);
  }

  closeConfirmation(): void {
    this.isConfirmationOpen$.next(false);
  }

  resolveAction(): void {
    switch (this.flow$.getValue()) {
      case FlowEnum.ResetTables:
        this.resetTables();
        break;
      case FlowEnum.ResetBalance:
        this.resetBalance();
        break;
      case FlowEnum.CleanHistory:
        this.resetHistory();
        break;
      case FlowEnum.CleanMonthlyHistory:
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
    this.appDataService.resetHistory();
  }

  private resetMonthlyHistory(): void {
    this.appDataService.resetMonthlyHistory();
  }
}
