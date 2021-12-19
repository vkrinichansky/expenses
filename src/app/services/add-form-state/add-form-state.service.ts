import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AddFormState {
  mode: 'edit' | 'add';
  isOpen: boolean;
  table: 'expenses' | 'income';
  category: string;
  categoryValue: number;
}
@Injectable({
  providedIn: 'root',
})
export class AddFormStateService {
  constructor() {}

  addFormState$: BehaviorSubject<AddFormState> =
    new BehaviorSubject<AddFormState>({
      isOpen: false,
      mode: 'add',
      table: 'expenses',
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

  updateState({
    isOpen,
    table,
    mode,
    category,
    categoryValue,
  }: AddFormState): void {
    this.addFormState$.next({
      isOpen,
      table,
      mode,
      category,
      categoryValue,
    });
  }
}
