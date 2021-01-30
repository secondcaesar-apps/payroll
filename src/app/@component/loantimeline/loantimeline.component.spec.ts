import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantimelineComponent } from './loantimeline.component';

describe('LoantimelineComponent', () => {
  let component: LoantimelineComponent;
  let fixture: ComponentFixture<LoantimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoantimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
