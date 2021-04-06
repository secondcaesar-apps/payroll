import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveryRatingReadComponent } from './survery-rating-read.component';

describe('SurveryRatingReadComponent', () => {
  let component: SurveryRatingReadComponent;
  let fixture: ComponentFixture<SurveryRatingReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveryRatingReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveryRatingReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
