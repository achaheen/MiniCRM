import { TestBed } from '@angular/core/testing';

import { SharedCustomerInfoService } from './shared-customer-info.service';

describe('SharedCustomerInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedCustomerInfoService = TestBed.get(SharedCustomerInfoService);
    expect(service).toBeTruthy();
  });
});
