import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RegistreRoutingModule } from './registre-routing.module';

import { ClientsLayoutComponent } from './clients/clients-layout/clients-layout.component';
import { TablesKitchenSinkComponent } from './clients/clients-list/clients-list.component';
import { ClientsCrudComponent } from './clients/clients-crud/clients-crud.component';
import { DesignIconsComponent } from './icons/icons.component';
import { TablesKitchenSinkEditComponent } from './clients/clients-list/edit/edit.component';

const COMPONENTS = [ClientsLayoutComponent, TablesKitchenSinkComponent, ClientsCrudComponent, DesignIconsComponent];
const COMPONENTS_DYNAMIC = [TablesKitchenSinkEditComponent];

@NgModule({
  imports: [SharedModule, RegistreRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RegistreModule {}
