import { Component, OnInit } from '@angular/core';

import { NewsfeedService } from './newsfeed.service';
import { Post } from '../../models/post.model';

import * as _ from 'lodash';
import { CategoriesService } from '../categories/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  public busy: boolean;
  public posts: Post[];
  public postsPiped: any;
  public categories: Category[];

  constructor(
    private newsfeedService: NewsfeedService,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getAllPosts();
    this.getAllCategories();
  }

  public getAll(): Promise<any> {
    return this.newsfeedService.getAllPosts().toPromise();
  }

  public getAllPosts(): void {
    this.busy = true;
    this.getAll().then((result) => {
      this.posts = result;
      this.postsPiped = _.groupBy(this.posts, (post: Post) => {
        return post.category.replace(/\s/g, '');
      });
    }, (reject) => {
      console.log(reject);
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.busy = false;
      });
  }

  public fetchAll(): Promise<any> {
    return this.categoriesService.getAll().toPromise();
  }

  public getAllCategories(): void {
    this.busy = true;
    this.fetchAll().then((result) => {
      this.categories = result;
    }, (reject) => {
      console.log(reject);
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.busy = false;
      });
  }

}
