import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveryAddComponent } from './survery-add.component';

describe('SurveryAddComponent', () => {
  let component: SurveryAddComponent;
  let fixture: ComponentFixture<SurveryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
