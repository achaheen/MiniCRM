import { TestBed } from '@angular/core/testing';

import { TopicSlaService } from './topic-sla.service';

describe('TopicSlaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopicSlaService = TestBed.get(TopicSlaService);
    expect(service).toBeTruthy();
  });
});
