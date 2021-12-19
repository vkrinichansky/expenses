import { Component, Input, OnInit } from '@angular/core';
import { AppDataService } from '../../services/app-data/app-data.service';

@Component({
  selector: 'app-current-balance',
  templateUrl: './current-balance.component.html',
  styleUrls: ['./current-balance.component.scss'],
})
export class CurrentBalanceComponent implements OnInit {
  @Input() data!: AppData;

  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {}

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
