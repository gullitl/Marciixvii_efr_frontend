import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ProfileOverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: ProfileOverviewComponent,
        data: { title: 'Profile Overview' },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
