import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddFormStateService } from '../../services/add-form-state/add-form-state.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppDataService } from '../../services/app-data/app-data.service';
import { TablesTitlesEnum, TablesTypesEnum, WordsEnum } from '../../consts';
import { AppData } from '../../types';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  form: FormGroup;

  words = WordsEnum;
  tableTitles = TablesTitlesEnum;

  tables = [TablesTitlesEnum.Expenses, TablesTitlesEnum.Income];
  categories: string[];
  appData$: Observable<AppData>;
  isConfirmationOpen$ = new BehaviorSubject(false);

  constructor(
    private addFormStateService: AddFormStateService,
    private appDataService: AppDataService
  ) {}

  ngOnInit(): void {
    this.appData$ = this.appDataService.appData$;
    this.form = new FormGroup({
      money: new FormControl(0, Validators.required),
      table: new FormControl(undefined, Validators.required),
      category: new FormControl(undefined, Validators.required),
    });

    this.subscription = this.form.controls.table.valueChanges
      .pipe(
        switchMap((table) =>
          this.appData$.pipe(
            map((appData) =>
              appData[this.resolveTable(table)].map((category) => category.name)
            )
          )
        )
      )
      .subscribe((categories) => {
        this.categories = categories;
        this.form.controls.category.setValue(this.categories[0]);
      });

    this.form.controls.table.setValue(this.tables[0]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openConfirmation(): void {
    this.isConfirmationOpen$.next(true);
  }

  closeConfirmation(): void {
    this.isConfirmationOpen$.next(false);
  }

  submit(): void {
    this.appDataService.addValueToCategory(
      this.form.value.money,
      this.resolveTable(this.form.value.table),
      this.form.value.category
    );
    this.form.reset({
      table: this.tables[0],
      category: this.categories[0],
      money: 0,
    });
    this.closeConfirmation();
  }

  private resolveTable(tableDisplayName: string): TablesTypesEnum {
    if (tableDisplayName === TablesTitlesEnum.Expenses) {
      return TablesTypesEnum.Expenses;
    } else {
      return TablesTypesEnum.Income;
    }
  }
}
