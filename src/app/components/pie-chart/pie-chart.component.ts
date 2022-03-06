import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent implements OnInit {
  pieChartType: ChartType = 'pie';
  pieChartOptions: ChartConfiguration['options'];

  @Input()
  title: string;

  @Input()
  pieChartData: ChartData<'pie', number[], string | string[]>;
  constructor() {}

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
      },
    };
  }
}

// = {
//   labels: ['Download', 'In', 'Mail Sales', 'Download', 'In', 'Mail Sales'],
//   datasets: [
//     {
//       data: [300, 500, 100, 300, 500, 100],
//     },
//   ],
// };
