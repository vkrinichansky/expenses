import { Component, Input, OnInit } from '@angular/core';
import { AppDataService } from '../../services/app-data/app-data.service';
import { AddFormStateService } from '../../services/add-form-state/add-form-state.service';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
})
export class TableItemComponent implements OnInit {
  @Input() item!: TableItem;
  @Input() table!: 'expenses' | 'income' | 'none';
  mode!: 'add' | 'edit';

  constructor(
    private appDataService: AppDataService,
    private addFormStateService: AddFormStateService
  ) {}

  ngOnInit(): void {}

  removeItem(): void {
    if (this.table != 'none') {
      this.appDataService.removeCategory(this.item.name, this.table);
    }
  }

  openFormToAdd(): void {
    if (this.table != 'none') {
      this.addFormStateService.updateState({
        isOpen: true,
        table: this.table,
        category: this.item.name,
        mode: this.mode,
        categoryValue: this.mode === 'add' ? 0 : this.item.value,
      });
    }
  }
}
