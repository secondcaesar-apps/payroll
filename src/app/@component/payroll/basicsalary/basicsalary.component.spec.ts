import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicsalaryComponent } from './basicsalary.component';

describe('BasicsalaryComponent', () => {
  let component: BasicsalaryComponent;
  let fixture: ComponentFixture<BasicsalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicsalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicsalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
