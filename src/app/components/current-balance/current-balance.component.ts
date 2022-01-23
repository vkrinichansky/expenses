import { Component, Input } from '@angular/core';
import { AppDataService } from '../../services/app-data/app-data.service';
import { AppData } from '../../types';
import { WordsEnum } from '../../consts';

@Component({
  selector: 'app-current-balance',
  templateUrl: './current-balance.component.html',
  styleUrls: ['./current-balance.component.scss'],
})
export class CurrentBalanceComponent {
  @Input() data: AppData;

  words = WordsEnum;

  constructor(private appDataService: AppDataService) {}

  calcBalance() {
    return this.appDataService.calcBalance();
  }
  resetTables(): void {
    this.appDataService.resetTables();
  }

  resetBalance(): void {
    this.appDataService.resetBalance();
  }
}
