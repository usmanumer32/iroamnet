import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastService } from 'src/app/providers/toast.service';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  form = new FormGroup({
    'title': new FormControl('', [Validators.required]),
    'price': new FormControl('', [Validators.required]),
    'currency': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
    'image': new FormControl(null, [Validators.required]),
  });
  public busy: boolean;
  public accept = ".png, .jpg, .jpeg";

  constructor(
    private toastService: ToastService,
    private productService: ProductsService,
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  addProduct(product: FormData): Promise<any> {
    return this.productService.create(product).toPromise();
  }

  save() {
    this.busy = true;
    if (this.form.get('title').value.trim() === '' ||
      this.form.get('description').value.trim() === '' ||
      this.form.get('price').value.trim() === '' ||
      this.form.get('currency').value.trim() === '' ||
      !this.form.get('image') || this.form.get('image').value === null) {
      this.toastService.warning('Please fill all the mandatory fields');
      this.busy = false;
      return;
    }
    let testData: FormData = new FormData();
    testData.append('image', this.form.get('image').value);
    testData.append('description', this.form.get('description').value);
    testData.append('title', this.form.get('title').value);
    testData.append('price', this.form.get('price').value);
    testData.append('currency', this.form.get('currency').value);
    this.addProduct(testData).then(() => {
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
