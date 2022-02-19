import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableTypesEnum } from '../../consts';

export interface AddFormState {
  table: TableTypesEnum;
  category: string;
  categoryValue: number;
}
@Injectable({
  providedIn: 'root',
})
export class AddFormStateService {
  addFormState$: BehaviorSubject<AddFormState> =
    new BehaviorSubject<AddFormState>({
      table: TableTypesEnum.Expenses,
      category: '',
      categoryValue: 0,
    });

  get addFormState(): AddFormState {
    return this.addFormState$.getValue();
  }

  updateState({ table, category, categoryValue }: AddFormState): void {
    this.addFormState$.next({
      table,
      category,
      categoryValue,
    });
  }
}
