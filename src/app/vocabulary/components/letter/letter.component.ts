import { Word } from './../../../shared/models/word';
import { EditWordComponent } from './../../dialogs/edit-word/edit-word.component';
import { AuthService } from './../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LetterService } from './../../../shared/services/letter.service';
import { Letter } from './../../../shared/models/letter';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent implements OnInit, OnDestroy {
  letter: Letter;
  subscription: Subscription;
  letterName: string;
  isLoading = false;
  isLoadingOnDelete = false;

  constructor(
    private route: ActivatedRoute,
    private letterService: LetterService,
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

  async deleteContent(wordId) {
    this.isLoadingOnDelete = true;
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
    } finally{
      this.isLoadingOnDelete = false;
    }
  }

  editWord(word: Word | null) {
    let wordCopy = JSON.parse(JSON.stringify(word));

    const dialogRef = this.dialog.open(EditWordComponent, {
      data: { word, letterId: this.letter.letterId },
      height: '70vh',
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
