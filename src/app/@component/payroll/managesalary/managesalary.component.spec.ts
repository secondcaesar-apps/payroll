import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesalaryComponent } from './managesalary.component';

describe('ManagesalaryComponent', () => {
  let component: ManagesalaryComponent;
  let fixture: ComponentFixture<ManagesalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
