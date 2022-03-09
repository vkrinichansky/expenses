import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppDataService } from './services/app-data/app-data.service';
import { TablesTitlesEnum, TablesTypesEnum, WordsEnum } from './consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  tablesTitlesEnum = TablesTitlesEnum;
  tablesTypesEnum = TablesTypesEnum;
  words = WordsEnum;

  title = 'expenses';

  constructor(private appDataService: AppDataService) {}

  ngOnInit() {
    this.appDataService.getDataFromStorage();
  }

  ngOnDestroy() {
    this.appDataService.setDataToStorage();
  }
}
