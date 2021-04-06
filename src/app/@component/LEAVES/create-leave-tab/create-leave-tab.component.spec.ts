import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeaveTabComponent } from './create-leave-tab.component';

describe('CreateLeaveTabComponent', () => {
  let component: CreateLeaveTabComponent;
  let fixture: ComponentFixture<CreateLeaveTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLeaveTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeaveTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
