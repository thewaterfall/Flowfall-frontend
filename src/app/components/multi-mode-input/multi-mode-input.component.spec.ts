import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiModeInputComponent } from './multi-mode-input.component';

describe('MultiModeInputComponent', () => {
  let component: MultiModeInputComponent;
  let fixture: ComponentFixture<MultiModeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiModeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiModeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
