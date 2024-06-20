import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { NewsfeedService } from '../newsfeed/newsfeed.service';
import { Post } from '../../models/post.model';

import * as _ from 'lodash';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastService } from 'src/app/providers/toast.service';
import { StorageService } from 'src/app/providers/storage.service';
import { CategoriesService } from '../categories/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public busy: boolean;
  public posts: Post[];
  public postsPiped: any;
  public categories: Category[];

  constructor(
    private newsfeedService: NewsfeedService,
    public dialog: MatDialog,
    public toastService: ToastService,
    private router: Router,
    private storageService: StorageService,
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

  getDeleteDialog(id: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        message: `Are you sure you want to delete this post</b>?`,
        input: id
      },
    });
  }

  delete(id: string): Promise<any> {
    return this.newsfeedService.delete(id).toPromise();
  }

  openDeleteDialog(element: Post) {
    const dialogRef = this.getDeleteDialog(element.id);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.busy = true;
        this.delete(result)
          .then(() => {
            this.toastService.success('Operation Succesful');
            this.getAllPosts();
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
    });
  }

  goAddNewsFeed() {
    this.router.navigate(['/add-newsfeed']);
  }

  goUpdatePost(post: Post) {
    this.storageService.setData('data', post);
    this.router.navigate(['/update-newsfeed']);
  }

}
