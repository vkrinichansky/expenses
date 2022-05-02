import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from './services/state-service/state.service';
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

  constructor(private appDataService: StateService) {}

  async ngOnInit(): Promise<void> {
    await this.appDataService.getDataFromStorage();
  }

  async ngOnDestroy(): Promise<void> {
    await this.appDataService.setDataToStorage();
  }
}
