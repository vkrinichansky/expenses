import { Component, Input, OnInit } from '@angular/core';
import { AppDataService } from '../../services/app-data/app-data.service';
import { TablesTypesEnum } from '../../consts';
import { TableItem } from '../../types';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
})
export class TableItemComponent implements OnInit {
  @Input() item: TableItem;
  @Input() table: TablesTypesEnum;
  @Input() displayControls = true;

  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {}

  removeItem(): void {
    this.appDataService.removeCategory(this.item.name, this.table);
  }
}
