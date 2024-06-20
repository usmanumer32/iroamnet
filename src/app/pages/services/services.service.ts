import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from 'src/app/providers/http.service';

import { Service } from 'src/app/models/service.model';
import { ServiceUpdate } from 'src/app/models/service-update.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl = 'https://api.iroamnet.com/iroamnetapi/';

  constructor(
    private http: HttpService,
  ) { }

  getAll(): Observable<Service[]> {
    return this.http.get(
      this.baseUrl + 'servicescontroller/view.php'
    ).pipe(map((response: any) => response));
  }

  create(service: FormData): Observable<Service> {
    return this.http.post(
      this.baseUrl + 'servicescontroller/create.php', service)
      .pipe(map((response: any) => response));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'servicescontroller/delete.php?id=' + id)
      .pipe(map((response: any) => response));
  }

  update(service: ServiceUpdate): Observable<Service> {
    return this.http.put(
      this.baseUrl + 'servicescontroller/update.php', service)
      .pipe(map((response: any) => response));
  }
}

