import { Component } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';

@Component({
  selector: 'app-clients-layout',
  templateUrl: './clients-layout.component.html',
})
export class ClientsLayoutComponent {
  isCrud = false;

  constructor(private auth: AuthenticationService) {}

  route() {
    if(this.isCrud) {
      this.isCrud = false;
    } else this.isCrud = true;
  }
}
