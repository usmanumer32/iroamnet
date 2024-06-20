import { TestBed, async, inject } from '@angular/core/testing';

import { UpdateServiceGuard } from './update-service.guard';

describe('UpdateServiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateServiceGuard]
    });
  });

  it('should ...', inject([UpdateServiceGuard], (guard: UpdateServiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
