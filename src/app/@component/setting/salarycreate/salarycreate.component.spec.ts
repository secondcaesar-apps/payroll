import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarycreateComponent } from './salarycreate.component';

describe('SalarycreateComponent', () => {
  let component: SalarycreateComponent;
  let fixture: ComponentFixture<SalarycreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarycreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarycreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
