import { TestBed } from '@angular/core/testing';

import { DistribuidoraServicesService } from './distribuidora-services.service';

describe('DistribuidoraServicesService', () => {
  let service: DistribuidoraServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistribuidoraServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
