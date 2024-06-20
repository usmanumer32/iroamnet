import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from 'src/app/providers/toast.service';
import { ServicesService } from '../services/services.service';
import { StorageService } from 'src/app/providers/storage.service';

import { Service } from 'src/app/models/service.model';

import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  public busy: boolean;
  public services: Service[];

  constructor(
    private servicesService: ServicesService,
    public dialog: MatDialog,
    public toastService: ToastService,
    private router: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getAllServices();
  }

  public getAll(): Promise<any> {
    return this.servicesService.getAll().toPromise();
  }

  public getAllServices(): void {
    this.busy = true;
    this.getAll().then((result) => {
      this.services = result;
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
        message: `Are you sure you want to delete this service</b>?`,
        input: id
      },
    });
  }

  delete(id: string): Promise<any> {
    return this.servicesService.delete(id).toPromise();
  }

  openDeleteDialog(element: Service) {
    const dialogRef = this.getDeleteDialog(element.id);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.busy = true;
        this.delete(result)
          .then(() => {
            this.toastService.success('Operation Succesful');
            this.getAllServices();
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

  goAddService() {
    this.router.navigate(['/add-service']);
  }

  goUpdateService(service: Service) {
    this.storageService.setData('data', service);
    this.router.navigate(['/update-service']);
  }
}
