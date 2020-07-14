import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DonlivmiRoutingModule } from './donlivmi-routing.module';

import { ClientsLayoutComponent } from './fiche/fiche-layout/fiche-layout.component';
import { TablesKitchenSinkComponent } from './fiche/fiche-list/fiche-list.component';
import { ClientsCrudComponent } from './fiche/fiche-crud/fiche-crud.component';
import { DesignIconsComponent } from './icons/icons.component';
import { TablesKitchenSinkEditComponent } from './fiche/fiche-list/edit/edit.component';

const COMPONENTS = [ClientsLayoutComponent, TablesKitchenSinkComponent, ClientsCrudComponent, DesignIconsComponent];
const COMPONENTS_DYNAMIC = [TablesKitchenSinkEditComponent];

@NgModule({
  imports: [SharedModule, DonlivmiRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class DonlivmiModule {}
