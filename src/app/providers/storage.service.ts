import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly keyUserId = 'admin.UserId';

  setData(property: string, data: any) {
    localStorage.setItem(`iroamnet.${property}`, JSON.stringify(data));
  }

  getData(property: string) {
    return JSON.parse(localStorage.getItem(`iroamnet.${property}`));
  }

  deleteData(property: string) {
    localStorage.removeItem(`iroamnet.${property}`);
  }

  setUserId(userId: string) {
    return localStorage.setItem(this.keyUserId, userId);
  }

  get getUserId() {
    return localStorage.getItem(this.keyUserId);
  }

  deleteUserId() {
    localStorage.removeItem(this.keyUserId);
  }
}
