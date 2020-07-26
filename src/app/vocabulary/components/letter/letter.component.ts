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

  deleteWord(wordId) {
    console.log('delete wordId', wordId);
  }

  editWord(word) {
    console.log('word before update', word);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //dialogConfig.height = '70%';
    dialogConfig.width = '620px';
    dialogConfig.height = '300px';
    dialogConfig.data = word;

    this.dialog.open(EditWordComponent, dialogConfig);

    const dialogRef = this.dialog.open(EditWordComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((data) => console.log('Dialog output:', data));
  }
}
