import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrentBalanceComponent } from './components/current-balance/current-balance.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { DailyHistoryItemComponent } from './components/history/daily-history-item/daily-history-item.component';
import { HistoryComponent } from './components/history/history.component';
import { MonthlyHistoryItemComponent } from './components/history/monthly-history-item/monthly-history-item.component';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { MonthlyResetComponent } from './components/monthly-reset/monthly-reset.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api-service/api.service';
import { StateService } from './services/state-service/state.service';
import { ButtonComponent } from './components/button/button.component';
import { DataResetComponent } from './components/data-reset/data-reset.component';
import { NgVarDirective } from './directives/ng-var.directive';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NoDataComponent } from './components/no-data/no-data.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CategoryManagementComponent,
    CurrentBalanceComponent,
    AddFormComponent,
    DailyHistoryItemComponent,
    DataResetComponent,
    HistoryComponent,
    MonthlyHistoryItemComponent,
    PieChartComponent,
    MonthlyResetComponent,
    ButtonComponent,
    NgVarDirective,
    ConfirmationComponent,
    NoDataComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgChartsModule, HttpClientModule],
  providers: [ApiService, StateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
