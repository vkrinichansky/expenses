import { Component, OnInit } from '@angular/core';
import { TablesTitlesEnum } from '../../consts';
import { AppDataService } from '../../services/app-data/app-data.service';
import { Observable } from 'rxjs';
import { ChartData } from 'chart.js';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-expenses-chart',
  templateUrl: './expenses-chart.component.html',
  styleUrls: ['./expenses-chart.component.scss'],
})
export class ExpensesChartComponent implements OnInit {
  tableTitles = TablesTitlesEnum;
  chartData$: Observable<ChartData<'pie', number[], string | string[]>>;

  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {
    this.chartData$ = this.appDataService.expenses$.pipe(
      map((expenses) => {
        return {
          labels: expenses.map((item) => item.name),
          datasets: [
            {
              data: expenses.map((item) => item.value),
            },
          ],
        };
      })
    );
  }
}
