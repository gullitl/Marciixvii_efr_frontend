import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ProfileOverviewComponent } from './overview/overview.component';

const COMPONENTS = [ProfileLayoutComponent, ProfileOverviewComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class ProfileModule {}
