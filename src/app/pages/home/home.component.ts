import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Service } from 'src/app/models/service.model';

import { StorageService } from 'src/app/providers/storage.service';
import { ToastService } from 'src/app/providers/toast.service';
import { ServicesService } from '../services/services.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private fragment: string;
  form = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required]),
    'message': new FormControl('', [Validators.required]),
  });
  public busy: boolean;
  public servicesList: Service[];

  constructor(
    public storageService: StorageService,
    public router: Router,
    public homeService: HomeService,
    private toastService: ToastService,
    private servicesService: ServicesService,
    private route: ActivatedRoute
  ) {
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getAllServices();
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    
  }

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }

  public getAll(): Promise<any> {
    return this.servicesService.getAll().toPromise();
  }

  public getAllServices(): void {
    this.busy = true;
    this.getAll().then((result) => {
      this.servicesList = result;
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

  goServiceDetail(service: Service) {
    this.storageService.setData('data', service);
    this.router.navigate(['/service-detail'])
  }

  sendEmail(data: FormData): Promise<any> {
    return this.homeService.create(data).toPromise();
  }

  send() {
    this.busy = true;
    if (this.form.get('name').value.trim() === '' ||
      this.form.get('email').value.trim() === '' ||
      this.form.get('message').value.trim() === '') {
      this.toastService.warning('Please fill all the mandatory fields');
      this.busy = false;
      return;
    }
    let testData: FormData = new FormData();
    testData.append('name', this.form.get('name').value);
    testData.append('email', this.form.get('email').value);
    testData.append('message', this.form.get('message').value);
    this.sendEmail(testData).then(() => {
      this.toastService.success('Operation Succesful');
      this.form.reset();
    }, (reject) => {
      this.form.reset();
    })
      .catch((error) => {
        this.form.reset();
      })
      .finally(() => {
        this.busy = false;
      });
  }

}
