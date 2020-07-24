import { Subscription } from 'rxjs';
import { LetterService } from './../../../shared/services/letter.service';
import { Letter } from './../../../shared/models/letter';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent implements OnInit, OnDestroy {
  private unSubArr = [];
  letter$: Promise<Letter>;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private letterService: LetterService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((param) => {
      this.letter$ = this.letterService.getByName(param.letter);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
