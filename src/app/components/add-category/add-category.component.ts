import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppDataService } from '../../services/app-data/app-data.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  form!: FormGroup;
  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      table: new FormControl('expenses', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }

  addCategory(): void {
    this.appDataService.addCategory(
      this.form.value.category,
      this.form.value.table
    );
    this.form.controls.category.reset();
  }
}
