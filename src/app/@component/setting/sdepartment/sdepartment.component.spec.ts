import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdepartmentComponent } from './sdepartment.component';

describe('SdepartmentComponent', () => {
  let component: SdepartmentComponent;
  let fixture: ComponentFixture<SdepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
