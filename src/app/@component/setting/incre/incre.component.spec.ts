import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreComponent } from './incre.component';

describe('IncreComponent', () => {
  let component: IncreComponent;
  let fixture: ComponentFixture<IncreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
