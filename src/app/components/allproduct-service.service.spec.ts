import { TestBed } from '@angular/core/testing';

import { AllproductServiceService } from './allproduct-service.service';

describe('AllproductServiceService', () => {
  let service: AllproductServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllproductServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
