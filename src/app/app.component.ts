import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppDataService } from './services/app-data/app-data.service';
import { AddFormStateService } from './services/add-form-state/add-form-state.service';
import {TablesTypesEnum} from "./consts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  tablesTypes = TablesTypesEnum;
  title = 'expenses';

  get appData(): AppData {
    return this.appDataService.appData;
  }

  get isOpen(): boolean {
    return this.addFormStateService.isOpen;
  }

  constructor(
    private appDataService: AppDataService,
    private addFormStateService: AddFormStateService
  ) {}

  ngOnInit() {
    this.appDataService.getDataFromStorage();

    if (!this.appData) {
      this.appDataService.appData = {
        balance: 0,
        income: [],
        expenses: [],
      };
    }
  }

  ngOnDestroy() {
    this.appDataService.setDataToStorage();
  }
}
