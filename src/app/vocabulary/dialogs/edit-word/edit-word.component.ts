import { Word } from './../../../shared/models/word';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.scss'],
})
export class EditWordComponent implements OnInit {
  word: Word;
  constructor(
    private dialogRef: MatDialogRef<EditWordComponent>,
    @Inject(MAT_DIALOG_DATA) data: Word
  ) {
    this.word = data;
  }

  ngOnInit(): void {}
  createWord(f) {}

  save(form) {
    this.dialogRef.close(form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
