import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsalaryComponent } from './reportsalary.component';

describe('ReportsalaryComponent', () => {
  let component: ReportsalaryComponent;
  let fixture: ComponentFixture<ReportsalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
