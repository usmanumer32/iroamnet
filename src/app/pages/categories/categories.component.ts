import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Category } from 'src/app/models/category.model';

import { CategoriesService } from './categories.service';
import { ToastService } from 'src/app/providers/toast.service';

import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  form = new FormGroup({
    'name': new FormControl('', [Validators.required]),
  });
  public busy: boolean;
  public categories: Category[];
  public model: Category;

  constructor(
    private categoriesService: CategoriesService,
    public dialog: MatDialog,
    public toastService: ToastService,
  ) { }

  ngOnInit() {
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

  getDeleteDialog(id: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        message: `Are you sure you want to delete this category</b>?`,
        input: id
      },
    });
  }

  delete(id: string): Promise<any> {
    return this.categoriesService.delete(id).toPromise();
  }

  openDeleteDialog(element: Category) {
    const dialogRef = this.getDeleteDialog(element.id);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.busy = true;
        this.delete(result)
          .then(() => {
            this.toastService.success('Operation Succesful');
            this.getAllCategories();
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

  addCategory(category: Category): Promise<any> {
    return this.categoriesService.create(category).toPromise();
  }

  save() {
    this.busy = true;
    this.model = this.form.value as Category;
    if (!this.model || this.model.name.trim() === '') {
      this.toastService.warning('Please fill the category name');
      return;
    }
    this.addCategory(this.model).then(() => {
      this.toastService.success('Operation Succesful');
      this.getAllCategories();
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
