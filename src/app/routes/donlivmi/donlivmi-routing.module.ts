import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignIconsComponent } from './icons/icons.component';
import { ClientsLayoutComponent } from './clients/clients-layout/clients-layout.component';
import { TablesKitchenSinkComponent } from './clients/clients-list/clients-list.component';
import { ClientsCrudComponent } from './clients/clients-crud/clients-crud.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsLayoutComponent,
    children: [
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      {
        path: 'clients',
        component: TablesKitchenSinkComponent,
        data: { title: 'Client List' },
      },
      {
        path: 'clients-crud',
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
export class DonlivmiRoutingModule {}
