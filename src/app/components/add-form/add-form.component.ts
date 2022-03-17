import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppDataService } from '../../services/app-data/app-data.service';
import { TablesTitlesEnum, WordsEnum } from '../../consts';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { resolveTable } from '../../utils';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  form: FormGroup;

  words = WordsEnum;
  tableTitles = TablesTitlesEnum;

  tables = [TablesTitlesEnum.Expenses, TablesTitlesEnum.Income];
  categories: string[];
  isConfirmationOpen$ = new BehaviorSubject(false);

  constructor(
    private appDataService: AppDataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      money: new FormControl(0, Validators.required),
      table: new FormControl(undefined, Validators.required),
      category: new FormControl(undefined, Validators.required),
    });

    this.subscription = this.form.controls.table.valueChanges
      .pipe(
        switchMap((table) =>
          this.appDataService[`${resolveTable(table)}$`].pipe(
            map((table) => table.map((category) => category.name))
          )
        )
      )
      .subscribe((categories) => {
        this.categories = categories;
        this.form.controls.category.setValue(this.categories[0]);
        this.cd.detectChanges();
      });

    this.form.controls.table.setValue(this.tables[0]);
  }

  ngOnDestroy(): void {
    this.isConfirmationOpen$.complete();
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
      resolveTable(this.form.value.table),
      this.form.value.category
    );
    this.form.reset({
      table: this.tables[0],
      category: this.categories[0],
      money: 0,
    });
    this.closeConfirmation();
  }
}
