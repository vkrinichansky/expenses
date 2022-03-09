import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppDataService } from '../../services/app-data/app-data.service';
import { WordsEnum } from '../../consts';
import { combineLatest, Observable } from 'rxjs';
import { getDateKey } from '../../utils';
import { map } from 'rxjs/operators';
import { MonthlyHistory } from '../../types';

@Component({
  selector: 'app-current-balance',
  templateUrl: './current-balance.component.html',
  styleUrls: ['./current-balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentBalanceComponent implements OnInit {
  words = WordsEnum;

  balance$: Observable<number>;

  date: Date;

  shouldDisplayMonthlyIndicator$: Observable<boolean>;

  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {
    this.balance$ = this.appDataService.balance$;
    this.date = new Date();
    this.shouldDisplayMonthlyIndicator$ = combineLatest(
      this.appDataService.monthWithoutReset$,
      this.appDataService.monthlyHistory$
    ).pipe(
      map(([monthWithoutReset, monthlyHistory]) =>
        this.shouldDoMonthlyReset(this.date, monthWithoutReset, monthlyHistory)
      )
    );
  }

  private shouldDoMonthlyReset(
    date: Date,
    monthWithoutReset: string,
    monthlyHistory: MonthlyHistory
  ): boolean {
    const day = date.getDate();
    const dateKey = getDateKey(date);
    return (
      day >= 1 && !(dateKey in monthlyHistory) && dateKey !== monthWithoutReset
    );
  }
}
