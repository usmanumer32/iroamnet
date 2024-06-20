import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from 'src/app/providers/http.service';

import { Product } from 'src/app/models/product.model';
import { ProductUpdate } from 'src/app/models/product-update.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'https://api.iroamnet.com/iroamnetapi/';

  constructor(
    private http: HttpService,
  ) { }

  getAll(): Observable<Product[]> {
    return this.http.get(
      this.baseUrl + 'productscontroller/view.php'
    ).pipe(map((response: any) => response));
  }

  create(product: FormData): Observable<Product> {
    return this.http.post(
      this.baseUrl + 'productscontroller/create.php', product)
      .pipe(map((response: any) => response));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'productscontroller/delete.php?id=' + id)
      .pipe(map((response: any) => response));
  }

  update(product: ProductUpdate): Observable<Product> {
    return this.http.put(
      this.baseUrl + 'productscontroller/update.php', product)
      .pipe(map((response: any) => response));
  }
}
