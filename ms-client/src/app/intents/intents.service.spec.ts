import { TestBed } from '@angular/core/testing';

import { IntentsService } from './intents.service';

describe('IntentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntentsService = TestBed.get(IntentsService);
    expect(service).toBeTruthy();
  });
});
