import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyHistoryItemComponent } from './monthly-history-item.component';

describe('MonthlyHistoryItemComponent', () => {
  let component: MonthlyHistoryItemComponent;
  let fixture: ComponentFixture<MonthlyHistoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyHistoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
