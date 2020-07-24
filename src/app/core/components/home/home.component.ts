import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import { LetterService } from './../../../shared/services/letter.service';

interface Letter {
  letterId: number;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  letters$: Promise<Letter> = null;

  constructor(
    public media: MediaObserver,
    private letterService: LetterService
  ) {}

  ngOnInit(): void {
    this.letters$ = this.letterService.getLettersNames();
  }
}
