import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterBComponent } from './letter-b.component';

describe('LetterBComponent', () => {
  let component: LetterBComponent;
  let fixture: ComponentFixture<LetterBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
