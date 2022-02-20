import { Component } from '@angular/core';
import { AppDataService } from '../../services/app-data/app-data.service';
import { WordsEnum } from '../../consts';
import { BehaviorSubject } from 'rxjs';

enum FlowEnum {
  ResetTables = 'Reset Tables',
  ResetBalance = 'Reset Balance',
  CleanHistory = 'Clean History',
}

@Component({
  selector: 'app-data-controls',
  templateUrl: './data-controls.component.html',
  styleUrls: ['./data-controls.component.scss'],
})
export class DataControlsComponent {
  words = WordsEnum;
  flows = FlowEnum;

  isConfirmationOpen$ = new BehaviorSubject(false);
  flow$ = new BehaviorSubject<FlowEnum | undefined>(undefined);

  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {}

  resetTables(): void {
    this.appDataService.resetTables();
  }

  resetBalance(): void {
    this.appDataService.resetBalance();
  }

  resetHistory(): void {
    this.appDataService.resetHistory();
  }

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
    }
    this.closeConfirmation();
  }
}
