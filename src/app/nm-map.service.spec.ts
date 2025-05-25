import { TestBed } from '@angular/core/testing';

import { NmMapService } from './nm-map.service';

describe('NmMapService', () => {
  let service: NmMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NmMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
