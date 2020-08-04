import { MediaObserver } from '@angular/flex-layout';
import 'quill-emoji/dist/quill-emoji.js';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { quillToolbar } from 'shared/models/quill-toolbar.ts';
import { shortQuillToolbar } from 'shared/models/short-quill-toolbar.ts';

import { Comment } from './../../../shared/models/comment';
import { AuthService } from './../../../shared/services/auth.service';
import { CommentService } from './../../../shared/services/comment.service';

@Component({
  selector: 'app-comment-reply',
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss'],
})
export class CommentReplyComponent {
  modules = {};
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<CommentReplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comment,
    private commentService: CommentService,
    private authService: AuthService,
    public media: MediaObserver,
    private toastr: ToastrService
  ) {
    if (
      this.authService.isLogged() &&
      this.authService.currentUser.roles.includes('ADMIN')
    )
      this.modules = quillToolbar;
    else this.modules = shortQuillToolbar;
  }

  async save(form) {
    if (!form.valid) return;

    form.value.userId = this.authService.currentUser._id;

    if (this.authService.currentUser.roles.includes('ADMIN'))
      form.value.isApproved = true;

    try {
      this.isLoading = true;

      const result = await this.commentService.addReply(
        form.value,
        this.data._id
      );

      this.toastr.success(
        'The comment reply has been successfully updated, after reviewing with the website owner it will be posted.'
      );

      this.dialogRef.close(result);
    } catch (err) {
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
  }

  close() {
    this.dialogRef.close();
  }
}
