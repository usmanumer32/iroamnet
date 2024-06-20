import { TestBed, async, inject } from '@angular/core/testing';

import { ProductsGuard } from './products.guard';

describe('ProductsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsGuard]
    });
  });

  it('should ...', inject([ProductsGuard], (guard: ProductsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
