import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableItemComponent } from './components/table-item/table-item.component';
import { CurrentBalanceComponent } from './components/current-balance/current-balance.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { TransactionsHistoryComponent } from './components/transactions-history/transactions-history.component';
import { TransactionRecordComponent } from './components/transaction-record/transaction-record.component';
import { DataControlsComponent } from './components/data-controls/data-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AddCategoryComponent,
    TableItemComponent,
    CurrentBalanceComponent,
    AddFormComponent,
    TransactionsHistoryComponent,
    TransactionRecordComponent,
    DataControlsComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
