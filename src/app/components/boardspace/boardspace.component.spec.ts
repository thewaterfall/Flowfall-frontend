import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardspaceComponent } from './boardspace.component';

describe('BoardspaceComponent', () => {
  let component: BoardspaceComponent;
  let fixture: ComponentFixture<BoardspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
