import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductUpdate } from 'src/app/models/product-update.model';
import { Product } from 'src/app/models/product.model';

import { StorageService } from 'src/app/providers/storage.service';
import { ToastService } from 'src/app/providers/toast.service';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  form = new FormGroup({
    'id': new FormControl('', [Validators.required]),
    'title': new FormControl('', [Validators.required]),
    'price': new FormControl('', [Validators.required]),
    'currency': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
  });
  public busy: boolean;
  public accept = ".png, .jpg, .jpeg"
  public model: ProductUpdate;
  public product: Product;

  constructor(
    private productService: ProductsService,
    private toastService: ToastService,
    private storageService: StorageService,
  ) {
    this.product = this.storageService.getData('data');
    this.form.get('id').setValue(this.product.id);
    this.form.get('title').setValue(this.product.title);
    this.form.get('price').setValue(this.product.price);
    this.form.get('currency').setValue(this.product.currency);
    this.form.get('description').setValue(this.product.description);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  updateProduct(product: ProductUpdate): Promise<any> {
    return this.productService.update(product).toPromise();
  }

  save() {
    this.busy = true;
    this.model = this.form.value as ProductUpdate;
    if (!this.model || this.model.title.trim() === '' ||
      this.model.price.trim() === '' ||
      this.model.currency.trim() === '' ||
      this.model.description === '' || this.model.id === '') {
      this.toastService.warning('Please fill all the mandatory fields');
      return;
    }
    this.updateProduct(this.model).then(() => {
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
