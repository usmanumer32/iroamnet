import { TestBed, async, inject } from '@angular/core/testing';

import { AddServiceGuard } from './add-service.guard';

describe('AddServiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddServiceGuard]
    });
  });

  it('should ...', inject([AddServiceGuard], (guard: AddServiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
