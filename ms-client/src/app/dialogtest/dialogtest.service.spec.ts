import { TestBed } from '@angular/core/testing';

import { DialogtestService } from './dialogtest.service';

describe('DialogtestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogtestService = TestBed.get(DialogtestService);
    expect(service).toBeTruthy();
  });
});
