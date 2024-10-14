import { TestBed } from '@angular/core/testing';

import { VvipService } from './vvip.service';

describe('VvipService', () => {
  let service: VvipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VvipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
