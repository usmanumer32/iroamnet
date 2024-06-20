import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { StorageService } from 'src/app/providers/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddNewsFeedGuard implements CanActivate {

  public userId: string;

  constructor(
    public storageService: StorageService,
    private router: Router,
  ) {
    this.userId = this.storageService.getUserId;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userId) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
