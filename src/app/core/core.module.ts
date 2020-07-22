import { VocabularyModule } from './../vocabulary/vocabulary.module';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../shared/material.module';
import { CoreRoutingModule } from './core-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    NoAccessComponent,
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    VocabularyModule,
    NgbModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
  ],
  exports: [NavBarComponent],
})
export class CoreModule { }
