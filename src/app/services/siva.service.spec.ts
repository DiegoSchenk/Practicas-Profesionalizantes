import { TestBed } from '@angular/core/testing';

import { SivaService } from './siva.service';

describe('SivaService', () => {
  let service: SivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
