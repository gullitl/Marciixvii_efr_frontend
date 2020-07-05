import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RegistreRoutingModule } from './registre-routing.module';

import { ClientsComponent } from './clients/clients.component';
import { DesignIconsComponent } from './icons/icons.component';

const COMPONENTS = [ClientsComponent, DesignIconsComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, RegistreRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RegistreModule {}
