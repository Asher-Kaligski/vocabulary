import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(param => {console.log(param)});
  }

}
