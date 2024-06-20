import { TestBed, async, inject } from '@angular/core/testing';

import { UpdateNewsFeedGuard } from './update-news-feed.guard';

describe('UpdateNewsFeedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateNewsFeedGuard]
    });
  });

  it('should ...', inject([UpdateNewsFeedGuard], (guard: UpdateNewsFeedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
