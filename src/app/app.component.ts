import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppDataService } from './services/app-data/app-data.service';
import { TablesTitlesEnum, TablesTypesEnum } from './consts';
import { AppData } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  tablesTitlesEnum = TablesTitlesEnum;
  tablesTypesEnum = TablesTypesEnum;

  title = 'expenses';

  get appData(): AppData {
    return this.appDataService.appData;
  }

  constructor(private appDataService: AppDataService) {}

  ngOnInit() {
    this.appDataService.getDataFromStorage();
  }

  ngOnDestroy() {
    this.appDataService.setDataToStorage();
  }
}
