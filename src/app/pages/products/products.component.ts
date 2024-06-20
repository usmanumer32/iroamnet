import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ProductsService } from './products.service';

import { Product } from 'src/app/models/product.model';
import { ToastService } from 'src/app/providers/toast.service';
import { StorageService } from 'src/app/providers/storage.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Product[];
  public busy: boolean;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    public toastService: ToastService,
    private router: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getAllProducts();
  }

  public getAll(): Promise<any> {
    return this.productsService.getAll().toPromise();
  }

  public getAllProducts(): void {
    this.busy = true;
    this.getAll().then((result) => {
      this.products = result;
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
        message: `Are you sure you want to delete this product</b>?`,
        input: id
      },
    });
  }

  delete(id: string): Promise<any> {
    return this.productsService.delete(id).toPromise();
  }

  openDeleteDialog(element: Product) {
    const dialogRef = this.getDeleteDialog(element.id);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.busy = true;
        this.delete(result)
          .then(() => {
            this.toastService.success('Operation Succesful');
            this.getAllProducts();
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

  goAddProduct() {
    this.router.navigate(['/add-product']);
  }

  goUpdateProduct(product: Product) {
    this.storageService.setData('data', product);
    this.router.navigate(['/update-product']);
  }

}
