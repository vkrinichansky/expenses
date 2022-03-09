import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyResetComponent } from './monthly-reset.component';

describe('MonthlyResetComponent', () => {
  let component: MonthlyResetComponent;
  let fixture: ComponentFixture<MonthlyResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
