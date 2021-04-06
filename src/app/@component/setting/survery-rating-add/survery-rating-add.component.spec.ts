import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveryRatingAddComponent } from './survery-rating-add.component';

describe('SurveryRatingAddComponent', () => {
  let component: SurveryRatingAddComponent;
  let fixture: ComponentFixture<SurveryRatingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveryRatingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveryRatingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
