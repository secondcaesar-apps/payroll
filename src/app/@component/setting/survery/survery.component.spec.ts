import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveryComponent } from './survery.component';

describe('SurveryComponent', () => {
  let component: SurveryComponent;
  let fixture: ComponentFixture<SurveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
