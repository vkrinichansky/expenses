import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state-service/state.service';
import { TablesTitlesEnum, DictionaryEnum } from '../../consts';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { resolveTable } from '../../utils';

enum FlowsEnum {
  AddCategory = 'Add Category',
  RemoveCategory = 'Remove Category',
}

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryManagementComponent implements OnInit, OnDestroy {
  tableTitles = TablesTitlesEnum;
  tables = [TablesTitlesEnum.Expenses, TablesTitlesEnum.Income];
  flows = FlowsEnum;
  dictionary = DictionaryEnum;
  addForm: FormGroup;
  removeForm: FormGroup;

  subscription: Subscription;
  categories: string[];

  flow$ = new BehaviorSubject<FlowsEnum | undefined>(undefined);
  isConfirmationOpen$ = new BehaviorSubject(false);

  constructor(
    private appDataService: StateService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
          this.appDataService[`${resolveTable(table)}$`].pipe(
            map((table) => table.map((category) => category.name))
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
    this.flow$.complete();
    this.isConfirmationOpen$.complete();
    this.subscription.unsubscribe();
  }

  addCategory(): void {
    this.appDataService.addCategory(
      this.addForm.value.category,
      resolveTable(this.addForm.value.table)
    );
    this.addForm.controls.category.reset();
    this.closeConfirmation();
  }

  removeCategory(): void {
    this.appDataService.removeCategory(
      this.removeForm.value.category,
      resolveTable(this.removeForm.value.table)
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
}
