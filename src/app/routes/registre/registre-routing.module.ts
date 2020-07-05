import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignIconsComponent } from './icons/icons.component';
import { ClientsLayoutComponent } from './clients/clients-layout/clients-layout.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientsCrudComponent } from './clients/clients-crud/clients-crud.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsLayoutComponent,
    children: [
      { path: '', redirectTo: 'clients-list', pathMatch: 'full' },
      {
        path: 'clients/clients-list',
        component: ClientsListComponent,
        data: { title: 'Client List' },
      },
      {
        path: 'clients/clients-crud',
        component: ClientsCrudComponent,
        data: { title: 'Add Client' },
      },
    ],
  },
  { path: 'icons', component: DesignIconsComponent, data: { title: 'Material Icons' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistreRoutingModule {}
