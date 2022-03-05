import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyHistoryComponent } from './daily-history.component';

describe('TransactionsHistoryComponent', () => {
  let component: DailyHistoryComponent;
  let fixture: ComponentFixture<DailyHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyHistoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
