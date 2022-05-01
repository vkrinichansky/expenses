import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrentBalanceComponent } from './components/current-balance/current-balance.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { DailyHistoryComponent } from './components/daily-history/daily-history.component';
import { DailyHistoryItemComponent } from './components/daily-history/daily-history-item/daily-history-item.component';
import { MonthlyHistoryComponent } from './components/monthly-history/monthly-history.component';
import { MonthlyHistoryItemComponent } from './components/monthly-history/monthly-history-item/monthly-history-item.component';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ExpensesChartComponent } from './components/expenses-chart/expenses-chart.component';
import { IncomeChartComponent } from './components/income-chart/income-chart.component';
import { MonthlyResetComponent } from './components/monthly-reset/monthly-reset.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api-service/api.service';
import { StateService } from './services/state-service/state.service';
import { ButtonComponent } from './components/button/button.component';
import { DataResetComponent } from './components/data-reset/data-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AddCategoryComponent,
    CurrentBalanceComponent,
    AddFormComponent,
    DailyHistoryComponent,
    DailyHistoryItemComponent,
    DataResetComponent,
    MonthlyHistoryComponent,
    MonthlyHistoryItemComponent,
    PieChartComponent,
    ExpensesChartComponent,
    IncomeChartComponent,
    MonthlyResetComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    HttpClientModule,
  ],
  providers: [ApiService, StateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
