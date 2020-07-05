import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileLayoutComponent } from './edit-profile/profile-layout/profile-layout.component';
import { EditProfileComponent } from './edit-profile/profile-crud/edit-profile.component';
import { ChangePasswordComponent } from './edit-profile/change-password/change-password.component';

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
        path: 'change-password',
        component: ChangePasswordComponent,
        data: { title: 'Change Password' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
