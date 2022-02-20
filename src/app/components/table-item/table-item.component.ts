import { Component, Input } from '@angular/core';
import { TablesTypesEnum } from '../../consts';
import { TableItem } from '../../types';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
})
export class TableItemComponent {
  @Input() item: TableItem;
  @Input() table: TablesTypesEnum;
}
