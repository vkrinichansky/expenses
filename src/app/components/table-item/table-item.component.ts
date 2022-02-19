import { Component, Input, OnInit } from '@angular/core';
import { AppDataService } from '../../services/app-data/app-data.service';
import { AddFormStateService } from '../../services/add-form-state/add-form-state.service';
import { FormModesEnum, TablesTypesEnum } from '../../consts';
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
  mode: FormModesEnum;
  formModes = FormModesEnum;

  constructor(
    private appDataService: AppDataService,
    private addFormStateService: AddFormStateService
  ) {}

  ngOnInit(): void {}

  removeItem(): void {
    this.appDataService.removeCategory(this.item.name, this.table);
  }

  openFormToAdd(): void {
    this.addFormStateService.updateState({
      table: this.table,
      category: this.item.name,
      categoryValue: 0,
    });
  }
}
