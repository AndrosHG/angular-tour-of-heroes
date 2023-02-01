import { TestBed } from '@angular/core/testing';

import { LogginserviceService } from './logginservice.service';

describe('LogginserviceService', () => {
  let service: LogginserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogginserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
