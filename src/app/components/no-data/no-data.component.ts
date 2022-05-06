import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { DictionaryEnum } from 'src/app/consts';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoDataComponent {
  dictionary = DictionaryEnum;

  @HostBinding('class.dark')
  @Input()
  isDark = false;
}
