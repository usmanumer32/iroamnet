import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/providers/toast.service';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  form = new FormGroup({
    'title': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
    'image': new FormControl(null, [Validators.required]),
  });
  public busy: boolean;
  public accept = ".png, .jpg, .jpeg";

  constructor(
    private serviceService: ServicesService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  addService(service: FormData): Promise<any> {
    return this.serviceService.create(service).toPromise();
  }

  save() {
    this.busy = true;
    if (this.form.get('title').value.trim() === '' ||
      this.form.get('description').value.trim() === '' ||
      !this.form.get('image') || this.form.get('image').value === null) {
      this.toastService.warning('Please fill all the mandatory fields');
      this.busy = false;
      return;
    }
    let testData: FormData = new FormData();
    testData.append('image', this.form.get('image').value);
    testData.append('description', this.form.get('description').value);
    testData.append('title', this.form.get('title').value);
    this.addService(testData).then(() => {
      this.toastService.success('Operation Succesful');
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
