import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataResetComponent } from './data-reset.component';

describe('DataResetComponent', () => {
  let component: DataResetComponent;
  let fixture: ComponentFixture<DataResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
