import { Component } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';

@Component({
  selector: 'app-clients-layout',
  templateUrl: './clients-layout.component.html',
})
export class ClientsLayoutComponent {
  constructor(private auth: AuthenticationService) {}

  username = () => this.auth.sessionUser.username;
  email = () => this.auth.sessionUser.email;
  photosrc = () => this.auth.sessionUser.photosrc;
  completName = () => `${this.auth.sessionUser.prenom} ${this.auth.sessionUser.nom} ${this.auth.sessionUser.postnom}`;
}
