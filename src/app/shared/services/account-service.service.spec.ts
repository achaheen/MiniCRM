import { TestBed } from '@angular/core/testing';

import { MWAccountService } from './account-service.service';

describe('MWAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MWAccountService = TestBed.get(MWAccountService);
    expect(service).toBeTruthy();
  });
});
