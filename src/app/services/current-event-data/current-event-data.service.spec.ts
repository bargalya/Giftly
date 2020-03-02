import { TestBed } from '@angular/core/testing';

import { CurrentEventDataService } from './current-event-data.service';

describe('CurrentEventDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentEventDataService = TestBed.get(CurrentEventDataService);
    expect(service).toBeTruthy();
  });
});
