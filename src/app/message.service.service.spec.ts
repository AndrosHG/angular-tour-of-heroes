import { TestBed } from '@angular/core/testing';

import { Message.ServiceService } from './message.service.service';

describe('Message.ServiceService', () => {
  let service: Message.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Message.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
