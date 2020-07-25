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

@NgModule({
  declarations: [UserFormComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    LetterService,
    CommentService,
  ],
  exports: [UserFormComponent],
})
export class SharedModule {}
