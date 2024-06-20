import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Category } from 'src/app/models/category.model';
import { PostUpdate } from 'src/app/models/post-update.model';
import { Post } from 'src/app/models/post.model';

import { StorageService } from 'src/app/providers/storage.service';
import { ToastService } from 'src/app/providers/toast.service';
import { CategoriesService } from '../categories/categories.service';
import { NewsfeedService } from '../newsfeed/newsfeed.service';

@Component({
  selector: 'app-update-news-feed',
  templateUrl: './update-news-feed.component.html',
  styleUrls: ['./update-news-feed.component.scss']
})
export class UpdateNewsFeedComponent implements OnInit {

  form = new FormGroup({
    'id': new FormControl('', [Validators.required]),
    'category': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
  });
  public busy: boolean;
  public categories: Category[];
  public accept = ".png, .jpg, .jpeg"
  public model: PostUpdate;
  public post: Post;

  constructor(
    private categoriesService: CategoriesService,
    private newsfeedService: NewsfeedService,
    private toastService: ToastService,
    private storageService: StorageService,
  ) {
    this.post = this.storageService.getData('data');
    this.form.get('id').setValue(this.post.id);
    this.form.get('category').setValue(this.post.category);
    this.form.get('description').setValue(this.post.description);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getAllCategories();
  }

  public getAll(): Promise<any> {
    return this.categoriesService.getAll().toPromise();
  }

  public getAllCategories(): void {
    this.busy = true;
    this.getAll().then((result) => {
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

  updateNewsFeed(newsfeed: PostUpdate): Promise<any> {
    return this.newsfeedService.update(newsfeed).toPromise();
  }

  save() {
    this.busy = true;
    this.model = this.form.value as PostUpdate;
    if (!this.model || this.model.category.trim() === '' ||
      this.model.description === '' || this.model.id === '') {
      this.toastService.warning('Please fill all the mandatory fields');
      return;
    }
    this.updateNewsFeed(this.model).then(() => {
      this.toastService.success('Operation Succesful');
    }, (reject) => {
      this.toastService.error(reject);
    })
      .catch((error) => {
        this.toastService.error(error);
      })
      .finally(() => {
        this.busy = false;
      });
  }

}
