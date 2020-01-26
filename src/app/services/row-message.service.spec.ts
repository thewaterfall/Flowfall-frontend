import { TestBed } from '@angular/core/testing';

import { RowMessageService } from './row-message.service';

describe('RowMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RowMessageService = TestBed.get(RowMessageService);
    expect(service).toBeTruthy();
  });
});
