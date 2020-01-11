import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowFeedDialogComponent } from './row-feed-dialog.component';

describe('RowFeedDialogComponent', () => {
  let component: RowFeedDialogComponent;
  let fixture: ComponentFixture<RowFeedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowFeedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowFeedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
