import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Login } from '../../models/login.model';
import { User } from '../../models/user.model';

import { LoginService } from './login.service';
import { ToastService } from 'src/app/providers/toast.service';
import { StorageService } from 'src/app/providers/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form = new FormGroup({
    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
  });
  public model: Login;
  public busy: boolean;
  public user: User;

  constructor(
    private loginService: LoginService,
    private toastService: ToastService,
    public storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public loginProvider(credential: Login): Promise<any> {
    return this.loginService.create(credential).toPromise();
  }

  public login(): void {
    this.busy = true;
    this.model = this.form.value as Login;
    if (this.model.email === '' || this.model.password === '') {
      this.toastService.warning('Please fill the fields');
      this.busy = false;
      return;
    }
    this.loginProvider(this.model).then((result: User[]) => {
      if (result.length === 0) {
        this.toastService.error('Incorrect email or password');
      } else {
        this.user = result[0];
        this.storageService.setUserId(this.user.id);
        this.toastService.success('Login Successful');
        this.router.navigate(['/admin']);
      }
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
