import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableItemComponent } from './components/table-item/table-item.component';
import { CurrentBalanceComponent } from './components/current-balance/current-balance.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { DailyHistoryComponent } from './components/daily-history/daily-history.component';
import { DailyHistoryItemComponent } from './components/daily-history/daily-history-item/daily-history-item.component';
import { DataControlsComponent } from './components/data-controls/data-controls.component';
import { MonthlyHistoryComponent } from './components/monthly-history/monthly-history.component';
import { MonthlyHistoryItemComponent } from './components/monthly-history/monthly-history-item/monthly-history-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AddCategoryComponent,
    TableItemComponent,
    CurrentBalanceComponent,
    AddFormComponent,
    DailyHistoryComponent,
    DailyHistoryItemComponent,
    DataControlsComponent,
    MonthlyHistoryComponent,
    MonthlyHistoryItemComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
