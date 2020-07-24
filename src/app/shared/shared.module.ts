import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CommentService } from './services/comment.service';
import { LetterService } from './services/letter.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    LetterService,
    CommentService,
  ],
})
export class SharedModule {}
