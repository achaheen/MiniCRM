import { TestBed } from '@angular/core/testing';

import { GlobalMessageService } from './global-message.service';

describe('GlobalMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalMessageService = TestBed.get(GlobalMessageService);
    expect(service).toBeTruthy();
  });
});
