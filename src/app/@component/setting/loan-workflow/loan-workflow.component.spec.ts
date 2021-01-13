import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanWorkflowComponent } from './loan-workflow.component';

describe('LoanWorkflowComponent', () => {
  let component: LoanWorkflowComponent;
  let fixture: ComponentFixture<LoanWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
