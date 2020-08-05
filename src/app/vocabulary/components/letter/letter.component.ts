import { MediaObserver } from '@angular/flex-layout';
import 'quill-emoji/dist/quill-emoji.js';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { quillToolbar } from 'shared/models/quill-toolbar.ts';
import { shortQuillToolbar } from 'shared/models/short-quill-toolbar.ts';

import { ConfirmationDialogComponent } from './../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Comment } from './../../../shared/models/comment';
import { Letter } from './../../../shared/models/letter';
import { Word } from './../../../shared/models/word';
import { AuthService } from './../../../shared/services/auth.service';
import { CommentService } from './../../../shared/services/comment.service';
import { LetterService } from './../../../shared/services/letter.service';
import { CommentReplyComponent } from './../../dialogs/comment-reply/comment-reply.component';
import { EditWordComponent } from './../../dialogs/edit-word/edit-word.component';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent implements OnInit, OnDestroy {
  modules = {};
  letter: Letter;
  comments: any;
  subscription: Subscription;
  letterName: string;
  isLoading = false;
  isLoadingOnUpdate = false;
  updatedCommentId: string = null;

  constructor(
    private route: ActivatedRoute,
    private letterService: LetterService,
    private commentService: CommentService,
    private toastr: ToastrService,
    public authService: AuthService,
    public media: MediaObserver,
    private dialog: MatDialog
  ) {
    if (
      this.authService.isLogged() &&
      this.authService.currentUser.roles.includes('ADMIN')
    )
      this.modules = quillToolbar;
    else this.modules = shortQuillToolbar;
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((param) => {
      this.letterName = param.letter;
      this.isLoading = true;
      this.letterService
        .getByName(param.letter)
        .then((result) => {
          this.isLoading = false;
          this.letter = result;
          // this.comments = this.letter.comments.filter((c) => c.isApproved);
          this.comments = this.letter.comments.filter((c) => {
            if (c.isApproved) return true;

            if (
              this.authService.isLogged() &&
              c.user._id === this.authService.currentUser._id
            )
              return true;

            return false;
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.toastr.error(err.error);
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async approveComment(comment: Comment) {
    const obj = {
      letterName: comment.letterName,
      content: comment.content,
      userId: this.authService.currentUser._id,
      isApproved: !comment.isApproved,
    };
    try {
      const result = await this.commentService.update(obj, comment._id);

      const index = this.letter.comments.findIndex(
        (c) => c._id === comment._id
      );
      if (index !== -1)
        this.letter.comments[index].isApproved = result.isApproved;

      this.toastr.success('The comment has been approved successfully');
    } catch (err) {
      this.toastr.error(err.error);
    }
  }

  getCommentRepliesCounter(comment: Comment) {
    return comment.replies.reduce((accumulator, reply) => {
      if (
        reply.isApproved ||
        (this.authService.isLogged() &&
          reply.user._id === this.authService.currentUser._id)
      )
        return accumulator + 1;
      else return accumulator;
    }, 0);
  }

  getCountNotApprovedReplies(comment: Comment) {
    return comment.replies.reduce((accumulator, reply) => {
      if (!reply.isApproved) return accumulator + 1;
      else return accumulator;
    }, 0);
  }

  async replyOnComment(comment: Comment) {
    if (!this.authService.isLogged())
      return this.toastr.error(
        'You could not reply on the comment, please login.'
      );

    const commentCopy = JSON.parse(JSON.stringify(comment));

    const dialogRef = this.dialog.open(CommentReplyComponent, {
      data: comment,
      height: '70vh',
      width: '800px',
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (this.authService.currentUser.roles.includes('ADMIN')) {
        const index = this.letter.comments.findIndex(
          (c) => c._id === comment._id
        );
        if (index !== -1) this.letter.comments[index] = result;
        return;
      }

      const index = this.comments.findIndex((c) => c._id === comment._id);
      if (index !== -1) this.comments[index] = result;

      this.updatedCommentId = this.comments[index]._id;
    });
  }

  async approveCommentReply(commentId, reply) {
    const obj = {
      content: reply.content,
      userId: this.authService.currentUser._id,
      isApproved: !reply.isApproved,
    };

    try {
      const result = await this.commentService.updateReply(
        obj,
        commentId,
        reply._id
      );
      const index = this.letter.comments.findIndex((c) => c._id === commentId);
      if (index !== -1) this.letter.comments[index] = result;

      this.updatedCommentId = this.letter.comments[index]._id;

      this.toastr.success(
        'The reply of the comment has been updated successfully'
      );
    } catch (err) {
      this.toastr.error(err.error);
    }
  }

  async deleteCommentReply(commentId, replyId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this comment's reply?",
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      this.isLoadingOnUpdate = true;
      try {
        const result = await this.commentService.deleteReply(
          commentId,
          replyId
        );

        const index = this.letter.comments.findIndex(
          (c) => c._id === commentId
        );
        if (index !== -1) this.letter.comments[index] = result;

        this.updatedCommentId = this.letter.comments[index]._id;

        this.toastr.success(
          'The reply of the comment has been deleted successfully'
        );
      } catch (err) {
        this.toastr.error(err.error);
      } finally {
        this.isLoadingOnUpdate = false;
      }
    });
  }

  async deleteComment(commentId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this comment?',
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      this.isLoadingOnUpdate = true;
      try {
        await this.commentService.delete(commentId);

        const index = this.letter.comments.findIndex(
          (c) => c._id === commentId
        );
        if (index !== -1) this.letter.comments.splice(index, 1);

        this.toastr.success('The comment has been deleted successfully');
      } catch (err) {
        this.toastr.error(err.error);
      } finally {
        this.isLoadingOnUpdate = false;
      }
    });
  }

  async saveComment(f) {
    if (!f.valid) return;

    if (!this.authService.isLogged())
      return this.toastr.error('Could not post your comment, please login.');

    try {
      f.value.letterName = this.letter.name;
      f.value.userId = this.authService.currentUser._id;

      if (this.authService.currentUser.roles.includes('ADMIN'))
        f.value.isApproved = true;

      const comment: Comment = await this.commentService.create(f.value);

      f.reset();

      if (comment.isApproved) this.letter.comments.push(comment);
      else if (comment.user._id === this.authService.currentUser._id)
        this.comments.push(comment);

      this.toastr.success(
        'The comment has been successfully saved, after approving with the owner of the website it will be posted'
      );
    } catch (err) {
      this.toastr.error(err.error);
    }
  }

  async deleteContent(wordId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this content?',
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      this.isLoadingOnUpdate = true;
      try {
        const result = await this.letterService.deleteWord(
          this.letter.letterId,
          wordId
        );

        const index = this.letter.words.findIndex((w) => w._id === wordId);
        if (index !== -1) this.letter.words.splice(index, 1);

        this.toastr.success('The word has been deleted successfully');
      } catch (err) {
        this.toastr.error(err.error);
      } finally {
        this.isLoadingOnUpdate = false;
      }
    });
  }

  editWord(word: Word | null) {
    const wordCopy = JSON.parse(JSON.stringify(word));

    const dialogRef = this.dialog.open(EditWordComponent, {
      data: { word, letterId: this.letter.letterId },
      height: '90vh',
      width: '800px',
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== 'updated') this.letter.words.push(result);

      if (!result && wordCopy) {
        const index = this.letter.words.findIndex(
          (w) => w._id === wordCopy._id
        );
        this.letter.words[index].name = wordCopy.name;
        this.letter.words[index].description = wordCopy.description;
      }
    });
  }
}
