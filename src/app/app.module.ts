import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { ToastrModule } from 'ngx-toastr';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpConfigInterceptor } from './core/services/interceptor.service';
import { MembershipModule } from './membership/membership.module';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    AdminModule,
    MembershipModule,
    CoreModule,
    AppRoutingModule,
    FlexLayoutModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
