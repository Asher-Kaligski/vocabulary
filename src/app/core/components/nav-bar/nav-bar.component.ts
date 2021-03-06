import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'shared/services/auth.service';
import { StorageService } from 'shared/services/storage.service';

import { Letter } from './../../../shared/models/letter';
import { LetterService } from './../../../shared/services/letter.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  letters: Letter[] = [];

  constructor(
    private storageService: StorageService,
    public media: MediaObserver,
    public authService: AuthService,
    private letterService: LetterService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    this.letters = await this.letterService.getLettersNames();
  }

  ngOnDestroy() {}

  search(input: HTMLInputElement) {
    console.log(input.value);
    // tslint:disable-next-line: curly
    if (!input.value) return;

    const searchedLetter = input.value.trim().charAt(0).toUpperCase();

    const letter = this.letters.find((l) => l.name === searchedLetter);
    // tslint:disable-next-line: curly
    if (!letter) return this.toastr.info('Searched word has not been found');

    this.router.navigate(['/letter'], {
      queryParams: { letter: searchedLetter },
    });
  }
}
