import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileLayoutComponent } from './edit-profile/profile-layout/profile-layout.component';
import { EditProfileComponent } from './edit-profile/profile-crud/edit-profile.component';
import { ChangePasswordComponent } from './edit-profile/change-password/change-password.component';

const COMPONENTS = [ProfileLayoutComponent, EditProfileComponent, ChangePasswordComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class ProfileModule {}
