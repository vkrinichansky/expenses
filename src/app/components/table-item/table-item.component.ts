import { Component, Input, OnInit } from '@angular/core';
import { AppDataService } from '../../services/app-data/app-data.service';
import { AddFormStateService } from '../../services/add-form-state/add-form-state.service';
import { FormModesEnum, TableTypesEnum } from '../../consts';
import { TableItem } from '../../types';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
})
export class TableItemComponent implements OnInit {
  @Input() item: TableItem;
  @Input() table: TableTypesEnum;
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

  openFormToAdd(mode: FormModesEnum): void {
    this.mode = mode;
    this.addFormStateService.updateState({
      isOpen: true,
      table: this.table,
      category: this.item.name,
      mode: this.mode,
      categoryValue: this.mode === FormModesEnum.Add ? 0 : this.item.value,
    });
  }
}
