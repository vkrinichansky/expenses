import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TablesTitlesEnum, WordsEnum } from '../../consts';
import { Observable } from 'rxjs';
import { ChartData } from 'chart.js';
import { map } from 'rxjs/operators';
import { AppDataService } from '../../services/app-data/app-data.service';
import { areAllCategoriesEmpty, noCategories } from '../../utils';

@Component({
  selector: 'app-income-chart',
  templateUrl: './income-chart.component.html',
  styleUrls: ['./income-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeChartComponent implements OnInit {
  words = WordsEnum;
  tableTitles = TablesTitlesEnum;
  chartData$: Observable<
    ChartData<'pie', number[], string | string[]> | undefined
  >;
  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {
    this.chartData$ = this.appDataService.income$.pipe(
      map((income) => {
        const labels = income.map((item) => item.name);
        const data = income.map((item) => item.value);
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
