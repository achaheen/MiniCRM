import { TestBed } from '@angular/core/testing';

import { CreditCardServiceService } from './credit-card-service.service';

describe('CreditCardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreditCardServiceService = TestBed.get(CreditCardServiceService);
    expect(service).toBeTruthy();
  });
});
