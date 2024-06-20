import { TestBed, async, inject } from '@angular/core/testing';

import { UpdateProductGuard } from './update-product.guard';

describe('UpdateProductGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateProductGuard]
    });
  });

  it('should ...', inject([UpdateProductGuard], (guard: UpdateProductGuard) => {
    expect(guard).toBeTruthy();
  }));
});
