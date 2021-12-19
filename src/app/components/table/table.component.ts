import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() tableTitle!: string;
  @Input() data!: TableItem[];

  constructor() {}

  ngOnInit(): void {}

  calcSum(): number {
    let totalSum = 0;
    for (let i = 0; i < this.data.length; i++) {
      totalSum += this.data[i].value;
    }
    return totalSum;
  }
}
