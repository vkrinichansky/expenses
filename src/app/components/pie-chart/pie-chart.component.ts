import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, ChartTypeRegistry } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TablesTitlesEnum, WordsEnum } from 'src/app/consts';
import { StateService } from 'src/app/services/state-service/state.service';
import { TableItem } from 'src/app/types';
import { noCategories, areAllCategoriesEmpty } from 'src/app/utils';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent implements OnInit {
  tableTitles = TablesTitlesEnum;
  words = WordsEnum;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  pieChartType: ChartType = 'pie';
  pieChartOptions: ChartConfiguration['options'];

  @Input()
  title: string;

  tableData$: Observable<TableItem[]>;
  chartData$: Observable<ChartData<'pie', number[], string | string[]>>;

  constructor(private appDataService: StateService) {}

  ngOnInit(): void {
    this.pieChartOptions = this.getChartOptions();

    this.tableData$ =
      this.title === TablesTitlesEnum.Expenses ? this.appDataService.expenses$ : this.appDataService.income$;

    this.chartData$ = this.tableData$.pipe(map((data) => this.getChartData(data)));
  }

  private getChartData(tableData: TableItem[]): any {
    const labels = tableData.map((item) => item.name);
    const data = tableData.map((item) => item.value);
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
  }

  private getChartOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: true,
          position: 'left',
          align: 'center',

          labels: {
            boxWidth: 16,
            font: {
              size: 16,
              family: 'Rubik',
            },
            color: '#f4d7ab',
          },
        },
        title: {
          text: this.title,
          display: true,
          color: '#f4d7ab',
          font: {
            size: 20,
            weight: 'bold',
            family: 'Rubik',
          },
        },
      },
    };
  }
}
