import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignIconsComponent } from './icons/icons.component';
import { ClientsLayoutComponent } from './fiche/fiche-layout/fiche-layout.component';
import { TablesKitchenSinkComponent } from './fiche/fiche-list/fiche-list.component';
import { ClientsCrudComponent } from './fiche/fiche-crud/fiche-crud.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsLayoutComponent,
    children: [
      { path: '', redirectTo: 'fiche', pathMatch: 'full' },
      {
        path: 'fiche',
        component: TablesKitchenSinkComponent,
        data: { title: 'Fiche List' },
      },
      {
        path: 'fiche-crud',
        component: ClientsCrudComponent,
        data: { title: 'Add Fiche' },
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
