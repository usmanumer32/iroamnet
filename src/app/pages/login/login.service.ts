import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from 'src/app/providers/http.service';

import { Login } from 'src/app/models/login.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'https://api.iroamnet.com/iroamnetapi/';

  constructor(
    private http: HttpService,
  ) { }

  getAll(): Observable<User[]> {
    return this.http.get(
      this.baseUrl + 'userscontroller/users.php'
    ).pipe(map((response: any) => response));
  }

  create(loginObj: Login): Observable<User> {
    return this.http.post(
      this.baseUrl + 'userscontroller/login.php', loginObj)
      .pipe(map((response: any) => response));
  }

  register(user: User): Observable<User> {
    return this.http.post(
      this.baseUrl + 'userscontroller/register.php', user)
      .pipe(map((response: any) => response));
  }

  delete(id: string): Observable<User> {
    return this.http.delete(this.baseUrl + 'userscontroller/delete.php?id=' + id)
      .pipe(map((response: any) => response));
  }
}
