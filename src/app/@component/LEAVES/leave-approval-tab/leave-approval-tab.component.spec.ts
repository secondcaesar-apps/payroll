import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApprovalTabComponent } from './leave-approval-tab.component';

describe('LeaveApprovalTabComponent', () => {
  let component: LeaveApprovalTabComponent;
  let fixture: ComponentFixture<LeaveApprovalTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveApprovalTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveApprovalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
