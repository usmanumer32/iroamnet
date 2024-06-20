import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Category } from 'src/app/models/category.model';
import { PostNew } from 'src/app/models/post-new.model';

import { ToastService } from 'src/app/providers/toast.service';
import { CategoriesService } from '../categories/categories.service';
import { NewsfeedService } from '../newsfeed/newsfeed.service';

@Component({
  selector: 'app-add-news-feed',
  templateUrl: './add-news-feed.component.html',
  styleUrls: ['./add-news-feed.component.scss']
})
export class AddNewsFeedComponent implements OnInit {

  form = new FormGroup({
    'category': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
    'image': new FormControl(null, [Validators.required]),
  });
  public busy: boolean;
  public categories: Category[];
  public accept = ".png, .jpg, .jpeg"
  public model: PostNew;

  constructor(
    private categoriesService: CategoriesService,
    private newsfeedService: NewsfeedService,
    private toastService: ToastService,
  ) { }

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

  addNewsFeed(newsfeed: FormData): Promise<any> {
    return this.newsfeedService.create(newsfeed).toPromise();
  }

  save() {
    this.busy = true;
    this.model = this.form.value as PostNew;
    if (!this.model || this.model.category.trim() === '' ||
      this.model.description === '' || !this.model.image || this.model.image === null) {
      this.toastService.warning('Please fill all the mandatory fields');
      return;
    }
    let testData: FormData = new FormData();
    testData.append('image', this.model.image);
    testData.append('description', this.model.description);
    testData.append('category', this.model.category);
    this.addNewsFeed(testData).then(() => {
      this.toastService.success('Operation Succesful');
      this.form.reset();
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
