import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileSettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent,
    children: [
      { path: '', redirectTo: 'edit-profile', pathMatch: 'full' },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        data: { title: 'Edit Profile' },
      },
      {
        path: 'settings',
        component: ProfileSettingsComponent,
        data: { title: 'Profile Settings' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
