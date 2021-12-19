import { Component, OnInit } from '@angular/core';
import {
  AddFormState,
  AddFormStateService,
} from '../../services/add-form-state/add-form-state.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppDataService } from '../../services/app-data/app-data.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  form!: FormGroup;
  get addFormState(): AddFormState {
    return this.addFormStateService.addFormState;
  }
  constructor(
    private addFormStateService: AddFormStateService,
    private appDataService: AppDataService
  ) {}

  ngOnInit(): void {
    console.log(this.addFormState.categoryValue);
    this.form = new FormGroup({
      money: new FormControl(
        this.addFormState.categoryValue,
        Validators.required
      ),
    });
  }

  submit(): void {
    if (this.addFormState.mode === 'add') {
      this.appDataService.addValueToCategory(
        this.form.value.money,
        this.addFormState.table,
        this.addFormState.category
      );
    } else {
      this.appDataService.editValueOfCategory(
        this.form.value.money,
        this.addFormState.table,
        this.addFormState.category
      );
    }
    this.form.reset();
    this.addFormStateService.IsOpen = false;
  }

  closeForm(): void {
    this.addFormStateService.updateState({
      isOpen: false,
      table: 'expenses',
      mode: 'add',
      category: '',
      categoryValue: 0,
    });
  }
}
