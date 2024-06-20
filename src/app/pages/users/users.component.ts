import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';

import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/providers/toast.service';
import { User } from 'src/app/models/user.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  form = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
    'confirmPassword': new FormControl('', [Validators.required]),
  });
  public busy: boolean;
  public users: User[];
  public model: User;

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog,
    public toastService: ToastService,
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  public getAll(): Promise<any> {
    return this.loginService.getAll().toPromise();
  }

  public getAllUsers(): void {
    this.busy = true;
    this.getAll().then((result) => {
      this.users = result;
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

  getDeleteDialog(id: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        message: `Are you sure you want to delete this user</b>?`,
        input: id
      },
    });
  }

  delete(id: string): Promise<any> {
    return this.loginService.delete(id).toPromise();
  }

  openDeleteDialog(element: User) {
    const dialogRef = this.getDeleteDialog(element.id);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.busy = true;
        this.delete(result)
          .then(() => {
            this.toastService.success('Operation Succesful');
            this.getAllUsers();
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
    });
  }

  addUser(user: User): Promise<any> {
    return this.loginService.register(user).toPromise();
  }

  save() {
    this.busy = true;
    this.model = this.form.value as User;
    if (!this.model || this.model.name.trim() === '' || this.model.email.trim() === ''
      || this.model.password.trim() === '' || this.form.get('confirmPassword').value === '') {
      this.toastService.warning('Please fill all the fields');
      this.busy = false;
      return;
    }
    if (this.model.password !== this.form.get('confirmPassword').value) {
      this.toastService.warning('Passwords mismatch');
      this.busy = false;
      return;
    }
    this.addUser(this.model).then(() => {
      this.toastService.success('Operation Succesful');
      this.getAllUsers();
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
