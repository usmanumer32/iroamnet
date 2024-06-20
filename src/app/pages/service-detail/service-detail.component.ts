import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/providers/storage.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  serviceDetail: any;

  constructor(
    public storageService: StorageService,
  ) {
    this.serviceDetail = this.storageService.getData('data');
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
