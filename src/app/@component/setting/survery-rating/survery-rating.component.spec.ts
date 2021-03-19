import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveryRatingComponent } from './survery-rating.component';

describe('SurveryRatingComponent', () => {
  let component: SurveryRatingComponent;
  let fixture: ComponentFixture<SurveryRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveryRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveryRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
