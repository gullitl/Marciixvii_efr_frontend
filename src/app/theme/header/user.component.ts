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
        <span>{{ 'user.profile' | translate }}</span>
      </a>
      <a routerLink="/profile/change-password" mat-menu-item>
        <mat-icon>wb_auto</mat-icon>
        <span>{{ 'change-password' | translate }}</span>
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

  username = () => this.auth.currentUserValue.username;
  photosrc = () => this.auth.currentUserValue.photosrc;

  logout() {
    this.auth.disconnect();
  }

}
