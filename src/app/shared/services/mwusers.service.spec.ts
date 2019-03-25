import { TestBed } from '@angular/core/testing';

import { MWUsersService } from './mwusers.service';

describe('MWUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MWUsersService = TestBed.get(MWUsersService);
    expect(service).toBeTruthy();
  });
});
