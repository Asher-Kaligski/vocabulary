import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { UserFormComponent } from 'shared/components/user-form/user-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CommentService } from './services/comment.service';
import { LetterService } from './services/letter.service';
import { UserService } from './services/user.service';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [UserFormComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    LetterService,
    CommentService,
  ],
  exports: [UserFormComponent],
  entryComponents: [ConfirmationDialogComponent],
})
export class SharedModule {}
