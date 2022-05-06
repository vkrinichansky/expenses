import { Component, EventEmitter, Output } from '@angular/core';
import { DictionaryEnum } from 'src/app/consts';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  dictionary = DictionaryEnum;

  @Output()
  confirmChoice = new EventEmitter<boolean>();

  yesClick(): void {
    this.confirmChoice.emit(true);
  }

  noClick(): void {
    this.confirmChoice.emit(false);
  }
}
