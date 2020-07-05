import { AuthenticationService } from '@shared/services/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <button
      mat-button
      class="matero-toolbar-button matero-avatar-button"
      href="javascript:void(0)"
      [matMenuTriggerFor]="menu"
    >
      <img class="matero-avatar" [src]="photosrc()" width="32" alt="avatar" />
      <span class="matero-username" fxHide.lt-sm>{{username()}}</span>
    </button>

    <mat-menu #menu="matMenu">
      <a routerLink="/profile/edit-profile" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'user.edit-profile' | translate }}</span>
      </a>
      <a routerLink="/dashboard/dashboard" mat-menu-item>
        <mat-icon>dashboard</mat-icon>
        <span>{{ 'menu.dashboard' | translate }}</span>
      </a>
      <a mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </a>
    </mat-menu>
  `,
})
export class UserComponent {

  constructor(private auth: AuthenticationService) {}

  username = () => this.auth.sessionUser.username;
  photosrc = () => this.auth.sessionUser.photosrc;

  logout() {
    this.auth.disconnect();
  }

}
