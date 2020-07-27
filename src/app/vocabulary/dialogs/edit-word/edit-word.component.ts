import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { LetterService } from './../../../shared/services/letter.service';

@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.scss'],
})
export class EditWordComponent {
  word: any;
  letterId: number;
  constructor(
    private dialogRef: MatDialogRef<EditWordComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private letterService: LetterService,
    private toastr: ToastrService
  ) {
    this.word = data.word;
    if (!this.word) {
      this.word = { name: '', description: '' };
    }

    this.letterId = data.letterId;
  }

  async save(form) {
    if (!form.valid) return;

    try {
      if (this.word?._id) form.value.wordId = this.word._id;

      const result = await this.letterService.createOrUpdateWord(
        this.letterId,
        form.value
      );

      this.toastr.success('The word has been successfully updated');

      if (this.word?._id) this.dialogRef.close('success');
      else this.dialogRef.close(result);
    } catch (err) {
      this.toastr.error(err.error);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
