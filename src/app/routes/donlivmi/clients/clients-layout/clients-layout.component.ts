import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-layout',
  templateUrl: './clients-layout.component.html',
})
export class ClientsLayoutComponent {
  clientsUrl = '/donlivmi/clients';
  isCrud: boolean;

  constructor(private router: Router) {
    this.isCrud = router.url === this.clientsUrl;
  }
}
