import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RegistreRoutingModule } from './registre-routing.module';

import { ClientsLayoutComponent } from './clients/clients-layout/clients-layout.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientsCrudComponent } from './clients/clients-crud/clients-crud.component';
import { DesignIconsComponent } from './icons/icons.component';

const COMPONENTS = [ClientsLayoutComponent, ClientsListComponent, ClientsCrudComponent, DesignIconsComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, RegistreRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RegistreModule {}
