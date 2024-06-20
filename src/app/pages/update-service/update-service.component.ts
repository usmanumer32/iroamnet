import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ServiceUpdate } from 'src/app/models/service-update.model';
import { Service } from 'src/app/models/service.model';

import { StorageService } from 'src/app/providers/storage.service';
import { ToastService } from 'src/app/providers/toast.service';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.scss']
})
export class UpdateServiceComponent implements OnInit {

  form = new FormGroup({
    'id': new FormControl('', [Validators.required]),
    'title': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
  });
  public busy: boolean;
  public accept = ".png, .jpg, .jpeg"
  public model: ServiceUpdate;
  public service: Service;

  constructor(
    private servicesService: ServicesService,
    private toastService: ToastService,
    private storageService: StorageService,
  ) {
    this.service = this.storageService.getData('data');
    this.form.get('id').setValue(this.service.id);
    this.form.get('title').setValue(this.service.title);
    this.form.get('description').setValue(this.service.description);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  updateNewsFeed(service: ServiceUpdate): Promise<any> {
    return this.servicesService.update(service).toPromise();
  }

  save() {
    this.busy = true;
    this.model = this.form.value as ServiceUpdate;
    if (!this.model || this.model.title.trim() === '' ||
      this.model.description === '' || this.model.id === '') {
      this.toastService.warning('Please fill all the mandatory fields');
      return;
    }
    this.updateNewsFeed(this.model).then(() => {
      this.toastService.success('Operation Succesful');
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
