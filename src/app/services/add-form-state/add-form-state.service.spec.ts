import { TestBed } from '@angular/core/testing';

import { AddFormStateService } from './add-form-state.service';

describe('AddFormStateService', () => {
  let service: AddFormStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFormStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
