import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from 'src/app/providers/http.service';

import { PostNew } from 'src/app/models/post-new.model';
import { Post } from '../../models/post.model';
import { PostUpdate } from 'src/app/models/post-update.model';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  private baseUrl = 'https://api.iroamnet.com/iroamnetapi/';

  constructor(
    private http: HttpService,
  ) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get(
      this.baseUrl + 'postscontroller/view.php'
    ).pipe(map((response: any) => response));
  }

  delete(id: string): Observable<Post> {
    return this.http.delete(this.baseUrl + 'postscontroller/delete.php?id=' + id)
      .pipe(map((response: any) => response));
  }

  create(post: FormData): Observable<PostNew> {
    return this.http.post(
      this.baseUrl + 'postscontroller/create.php', post)
      .pipe(map((response: any) => response));
  }

  update(post: PostUpdate): Observable<Post> {
    return this.http.put(
      this.baseUrl + 'postscontroller/update.php', post)
      .pipe(map((response: any) => response));
  }
}
