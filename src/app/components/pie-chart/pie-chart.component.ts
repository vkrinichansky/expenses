import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  pieChartType: ChartType = 'pie';
  pieChartOptions: ChartConfiguration['options'];

  @Input()
  title: string;

  @Input()
  pieChartData: ChartData<'pie', number[], string | string[]>;

  ngOnInit(): void {
    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'left',
          labels: {
            font: {
              size: 14,
              family: 'Rubik',
            },
          },
        },
        title: {
          text: this.title,
          display: true,
          font: {
            size: 16,
            weight: 'bold',
            family: 'Rubik',
          },
        },
      },
    };
  }
}
