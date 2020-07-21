import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoAccessComponent } from './components/no-access/no-access.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'no-access', component: NoAccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}