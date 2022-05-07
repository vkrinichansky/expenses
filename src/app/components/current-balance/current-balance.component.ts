import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state-service/state.service';
import { DictionaryEnum } from '../../consts';
import { combineLatest, Observable, of } from 'rxjs';
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
  dictionary = DictionaryEnum;

  balance$: Observable<number>;

  date: Date;

  shouldDisplayMonthlyIndicator$: Observable<boolean>;

  constructor(private appDataService: StateService) {}

  ngOnInit(): void {
    this.balance$ = this.appDataService.balance$;
    this.date = new Date();
    this.shouldDisplayMonthlyIndicator$ = of(true);
    // combineLatest([
    //   this.appDataService.monthWithoutReset$,
    //   this.appDataService.monthlyHistory$,
    // ]).pipe(
    //   map(([monthWithoutReset, monthlyHistory]) =>
    //     this.shouldDoMonthlyReset(this.date, monthWithoutReset, monthlyHistory)
    //   )
    // );
  }

  private shouldDoMonthlyReset(date: Date, monthWithoutReset: string, monthlyHistory: MonthlyHistory): boolean {
    const day = date.getDate();
    const dateKey = getDateKey(date);
    return day >= 1 && !(dateKey in monthlyHistory) && dateKey !== monthWithoutReset;
  }
}
