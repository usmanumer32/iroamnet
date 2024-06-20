import { TestBed, async, inject } from '@angular/core/testing';

import { AddNewsFeedGuard } from './add-news-feed.guard';

describe('AddNewsFeedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNewsFeedGuard]
    });
  });

  it('should ...', inject([AddNewsFeedGuard], (guard: AddNewsFeedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
