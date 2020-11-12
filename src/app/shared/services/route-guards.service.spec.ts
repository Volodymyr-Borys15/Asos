import { TestBed } from '@angular/core/testing';

import { RouteGuardsService } from './route-guards.service';

describe('RouteGuardsService', () => {
  let service: RouteGuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
