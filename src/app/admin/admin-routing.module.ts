import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from 'shared/components/user-form/user-form.component';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { AdminCommentsComponent } from './components/admin-comments/admin-comments.component';
import { AdminLettersComponent } from './components/admin-letters/admin-letters.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

const routes: Routes = [
  {
    path: 'admin/letters',
    component: AdminLettersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/comments',
    component: AdminCommentsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/users/:id',
    component: UserFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
