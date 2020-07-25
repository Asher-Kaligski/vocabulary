import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLettersComponent } from './admin-letters.component';

describe('AdminLettersComponent', () => {
  let component: AdminLettersComponent;
  let fixture: ComponentFixture<AdminLettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLettersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
