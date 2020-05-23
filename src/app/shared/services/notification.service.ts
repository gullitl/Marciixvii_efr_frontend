import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackbar: MatSnackBar) { }

  sucess = (message: string) => this.notify(message, NotificationAction.Sucess);
  warning = (message: string) => this.notify(message, NotificationAction.Warning);
  error = (message: string) => this.notify(message, NotificationAction.Error);

  private notify = (message: string, action: NotificationAction) => this.snackbar.open(message, action, {duration: 3000});

}

enum NotificationAction {
  Sucess = 'Sucess',
  Warning = 'Warning',
  Error = 'Error'
}
