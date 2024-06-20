import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from 'src/app/providers/http.service';

import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = 'https://api.iroamnet.com/iroamnetapi/';

  constructor(
    private http: HttpService,
  ) { }

  getAll(): Observable<CategoriesService[]> {
    return this.http.get(
      this.baseUrl + 'categoriescontroller/view.php'
    ).pipe(map((response: any) => response));
  }

  create(category: Category): Observable<Category> {
    return this.http.post(
      this.baseUrl + 'categoriescontroller/create.php', category)
      .pipe(map((response: any) => response));
  }

  delete(id: string): Observable<Category> {
    return this.http.delete(this.baseUrl + 'categoriescontroller/delete.php?id=' + id)
      .pipe(map((response: any) => response));
  }
}
