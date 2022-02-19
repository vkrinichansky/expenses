import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableTypesEnum } from '../../consts';

export interface AddFormState {
  isOpen: boolean;
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
      isOpen: false,
      table: TableTypesEnum.Expenses,
      category: '',
      categoryValue: 0,
    });

  get isOpen(): boolean {
    return this.addFormState.isOpen;
  }

  get addFormState(): AddFormState {
    return this.addFormState$.getValue();
  }

  set IsOpen(isOpen: boolean) {
    this.addFormState.isOpen = isOpen;
  }

  updateState({ isOpen, table, category, categoryValue }: AddFormState): void {
    this.addFormState$.next({
      isOpen,
      table,
      category,
      categoryValue,
    });
  }
}
