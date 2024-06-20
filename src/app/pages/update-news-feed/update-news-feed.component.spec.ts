import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNewsFeedComponent } from './update-news-feed.component';

describe('UpdateNewsFeedComponent', () => {
  let component: UpdateNewsFeedComponent;
  let fixture: ComponentFixture<UpdateNewsFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNewsFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNewsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
