import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppDataService } from '../../services/app-data/app-data.service';
import { TablesTitlesEnum, TablesTypesEnum, WordsEnum } from '../../consts';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppData } from '../../types';

enum FlowsEnum {
  AddCategory = 'Add Category',
  RemoveCategory = 'Remove Category',
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  tableTitles = TablesTitlesEnum;
  tables = [TablesTitlesEnum.Expenses, TablesTitlesEnum.Income];
  flows = FlowsEnum;
  words = WordsEnum;
  addForm: FormGroup;
  removeForm: FormGroup;

  subscription: Subscription;
  categories: string[];

  flow$ = new BehaviorSubject<FlowsEnum | undefined>(undefined);
  appData$: Observable<AppData>;
  isConfirmationOpen$ = new BehaviorSubject(false);

  constructor(
    private appDataService: AppDataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.appData$ = this.appDataService.appData$;

    this.addForm = new FormGroup({
      table: new FormControl(this.tables[0], Validators.required),
      category: new FormControl('', Validators.required),
    });

    this.removeForm = new FormGroup({
      table: new FormControl(undefined, Validators.required),
      category: new FormControl(undefined, Validators.required),
    });

    this.subscription = this.removeForm.controls.table.valueChanges
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
        this.removeForm.controls.category.setValue(this.categories[0]);
        this.cd.detectChanges();
      });
    this.removeForm.controls.table.setValue(this.tables[0]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addCategory(): void {
    this.appDataService.addCategory(
      this.addForm.value.category,
      this.resolveTable(this.addForm.value.table)
    );
    this.addForm.controls.category.reset();
    this.closeConfirmation();
  }

  removeCategory(): void {
    this.appDataService.removeCategory(
      this.removeForm.value.category,
      this.resolveTable(this.removeForm.value.table)
    );
    this.removeForm.reset({
      table: this.tables[0],
      category: this.categories[0],
    });
    this.closeConfirmation();
  }

  changeFlow(flow: FlowsEnum): void {
    this.flow$.next(flow);
  }

  resetFlow(): void {
    this.flow$.next(undefined);
  }

  openConfirmation(): void {
    this.isConfirmationOpen$.next(true);
  }

  closeConfirmation(): void {
    this.isConfirmationOpen$.next(false);
  }

  private resolveTable(tableDisplayName: string): TablesTypesEnum {
    if (tableDisplayName === TablesTitlesEnum.Expenses) {
      return TablesTypesEnum.Expenses;
    } else {
      return TablesTypesEnum.Income;
    }
  }
}
