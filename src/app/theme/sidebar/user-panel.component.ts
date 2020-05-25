import { Component } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel" fxLayout="column" fxLayoutAlign="center center">
      <img class="matero-user-panel-avatar" [src]="photosrc()" alt="avatar" width="64" />
      <h4 class="matero-user-panel-name">{{username()}}</h4>
      <h5 class="matero-user-panel-email">{{email()}}</h5>
      <div class="matero-user-panel-icons">
        <a routerLink="/profile/edit-profile" mat-icon-button>
          <mat-icon>account_circle</mat-icon>
        </a>
        <a routerLink="/profile/change-password" mat-icon-button>
          <mat-icon>wb_auto</mat-icon>
        </a>
        <a routerLink="/auth/login" mat-icon-button (click)="logout()">
          <mat-icon>exit_to_app</mat-icon>
        </a>
      </div>
    </div>
  `,
})
export class UserPanelComponent {

  constructor(private auth: AuthenticationService) {}

  username = () => this.auth.currentUserValue.username;
  email = () => this.auth.currentUserValue.email;
  photosrc = () => this.auth.currentUserValue.photosrc;

  logout() {
    this.auth.disconnect();
  }

}
