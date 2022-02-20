import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../../services/app-data/app-data.service';
import { WordsEnum } from '../../consts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-current-balance',
  templateUrl: './current-balance.component.html',
  styleUrls: ['./current-balance.component.scss'],
})
export class CurrentBalanceComponent implements OnInit {
  words = WordsEnum;

  balance$: Observable<number>;

  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {
    this.balance$ = this.appDataService.balance$;
  }
}
