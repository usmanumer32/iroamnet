import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from 'src/app/providers/http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = 'https://api.iroamnet.com/iroamnetapi/';

  constructor(
    private http: HttpService,
  ) { }

  create(data: FormData): Observable<any> {
    return this.http.post(
      this.baseUrl + 'sendemail.php', data)
      .pipe(map((response: any) => response));
  }
}
