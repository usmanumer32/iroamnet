import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  public products: Product[];
  public busy: boolean;

  constructor(
    private productsService: ProductsService,
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

}
