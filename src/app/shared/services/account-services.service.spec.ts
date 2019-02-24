import { TestBed } from '@angular/core/testing';

import { AccountServicesService } from './account-services.service';

describe('AccountServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountServicesService = TestBed.get(AccountServicesService);
    expect(service).toBeTruthy();
  });
});
