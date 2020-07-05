import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { DesignIconsComponent } from './icons/icons.component';

const routes: Routes = [
  { path: 'clients', component: ClientsComponent, data: { title: 'Material Colors' } },
  { path: 'icons', component: DesignIconsComponent, data: { title: 'Material Icons' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistreRoutingModule {}
