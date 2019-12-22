import { TestBed } from '@angular/core/testing';

import { BoardColumnService } from './board-column.service';

describe('BoardColumnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardColumnService = TestBed.get(BoardColumnService);
    expect(service).toBeTruthy();
  });
});
