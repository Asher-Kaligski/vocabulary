import { ConfirmationDialogComponent } from './../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

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
  letter: Letter;
  comments: any;
  subscription: Subscription;
  letterName: string;
  isLoading = false;
  isLoadingOnUpdate = false;

  constructor(
    private route: ActivatedRoute,
    private letterService: LetterService,
    private commentService: CommentService,
    private toastr: ToastrService,
    public authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((param) => {
      this.letterName = param.letter;
      this.isLoading = true;
      this.letterService
        .getByName(param.letter)
        .then((result) => {
          this.isLoading = false;
          this.letter = result;
          this.comments = this.letter.comments.filter((c) => c.isApproved);
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

      const index = this.letter.comments.findIndex(
        (c) => c._id === comment._id
      );
      if (index !== -1) this.letter.comments[index] = result;
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
