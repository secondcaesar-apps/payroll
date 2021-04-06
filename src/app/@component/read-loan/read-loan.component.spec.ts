import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadLoanComponent } from './read-loan.component';

describe('ReadLoanComponent', () => {
  let component: ReadLoanComponent;
  let fixture: ComponentFixture<ReadLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
