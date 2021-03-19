import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveryReadComponent } from './survery-read.component';

describe('SurveryReadComponent', () => {
  let component: SurveryReadComponent;
  let fixture: ComponentFixture<SurveryReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveryReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveryReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
