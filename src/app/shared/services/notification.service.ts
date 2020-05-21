import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackbar: MatSnackBar) { }

  sucess = (message: string) => this.notificate(message, NotificationAction.Sucess);
  warning = (message: string) => this.notificate(message, NotificationAction.Warning);
  error = (message: string) => this.notificate(message, NotificationAction.Error);

  private notificate = (message: string, action: NotificationAction) =>
    this.snackbar.open(message, action, {
      duration: 2500
    });

}

enum NotificationAction {
  Sucess = 'Sucess',
  Warning = 'Warning',
  Error = 'Error'
}
