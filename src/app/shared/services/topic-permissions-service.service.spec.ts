import { TestBed } from '@angular/core/testing';

import { TopicPermissionsService} from './topic-permissions-service.service';

describe('TopicPermissionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopicPermissionsService = TestBed.get(TopicPermissionsService);
    expect(service).toBeTruthy();
  });
});
