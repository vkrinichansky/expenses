import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TablesTitlesEnum, WordsEnum } from '../../consts';
import { StateService } from '../../services/state-service/state.service';
import { Observable } from 'rxjs';
import { ChartData } from 'chart.js';
import { map } from 'rxjs/operators';
import { areAllCategoriesEmpty, noCategories } from '../../utils';

@Component({
  selector: 'app-expenses-chart',
  templateUrl: './expenses-chart.component.html',
  styleUrls: ['./expenses-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesChartComponent implements OnInit {
  words = WordsEnum;
  tableTitles = TablesTitlesEnum;
  chartData$: Observable<
    ChartData<'pie', number[], string | string[]> | undefined
  >;

  constructor(private appDataService: StateService) {}

  ngOnInit(): void {
    this.chartData$ = this.appDataService.expenses$.pipe(
      map((expenses) => {
        const labels = expenses.map((item) => item.name);
        const data = expenses.map((item) => item.value);
        if (noCategories(labels) || areAllCategoriesEmpty(data)) {
          return undefined;
        }
        return {
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        };
      })
    );
  }
}
