import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './../shared/material.module';
import { SharedModule } from './../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  declarations: [AdminUsersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    AdminRoutingModule,
  ],

  providers: [AdminAuthGuard],
})
export class AdminModule {}
