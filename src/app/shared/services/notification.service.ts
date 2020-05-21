import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackbar: MatSnackBar) { }

  #messageDuration = 2000;

  sucess(message: string) {
    this.snackbar.open('Sucess: ' + message, '', {
      duration: this.#messageDuration,
      horizontalPosition: MessageHP.Right,
      verticalPosition: MessageVP.Top
    });
  }

  error(message: string) {
    this.snackbar.open('Error: ' + message, '', {
      duration: this.#messageDuration,
      horizontalPosition: MessageHP.Right,
      verticalPosition: MessageVP.Top
    });
  }

  warning(message: string) {
    this.snackbar.open('Warning: ' + message, '', {
      duration: this.#messageDuration,
      horizontalPosition: MessageHP.Right,
      verticalPosition: MessageVP.Top
    });
  }

}

enum MessageHP {
  Right = 'right',
  Left = 'left',
}

enum MessageVP {
  Top = 'top',
  Bottom = 'bottom',
}
