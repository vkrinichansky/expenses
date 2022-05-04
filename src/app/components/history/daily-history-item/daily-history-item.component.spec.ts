import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyHistoryItemComponent } from './daily-history-item.component';

describe('DateRecordComponent', () => {
  let component: DailyHistoryItemComponent;
  let fixture: ComponentFixture<DailyHistoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyHistoryItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
