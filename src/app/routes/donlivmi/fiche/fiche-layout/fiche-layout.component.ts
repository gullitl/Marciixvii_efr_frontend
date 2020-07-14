import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fiche-layout',
  templateUrl: './fiche-layout.component.html',
})
export class ClientsLayoutComponent {
  ficheUrl = '/donlivmi/fiche';
  isCrud: boolean;

  constructor(private router: Router) {
    this.isCrud = router.url === this.ficheUrl;
  }
}
