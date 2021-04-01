import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeebackComponent } from './feeback.component';

describe('FeebackComponent', () => {
  let component: FeebackComponent;
  let fixture: ComponentFixture<FeebackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeebackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
