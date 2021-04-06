import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SscorebyperiodComponent } from './sscorebyperiod.component';

describe('SscorebyperiodComponent', () => {
  let component: SscorebyperiodComponent;
  let fixture: ComponentFixture<SscorebyperiodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SscorebyperiodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SscorebyperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
