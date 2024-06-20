import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsfeedComponent } from './pages/newsfeed/newsfeed.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

import { MatFileUploadModule } from 'angular-material-fileupload';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

import { FooterComponent } from './pages/footer/footer.component';
import { NewsfeedService } from './pages/newsfeed/newsfeed.service';
import { LoginService } from './pages/login/login.service';
import { HttpService } from './providers/http.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from './providers/toast.service';
import { StorageService } from './providers/storage.service';
import { AdminNavComponent } from './pages/admin-nav/admin-nav.component';
import { ConfirmDialogComponent } from './pages/confirm-dialog/confirm-dialog.component';
import { AddNewsFeedComponent } from './pages/add-news-feed/add-news-feed.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoriesService } from './pages/categories/categories.service';
import { UpdateNewsFeedComponent } from './pages/update-news-feed/update-news-feed.component';
import { UsersComponent } from './pages/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { HomeService } from './pages/home/home.service';
import { ServicesComponent } from './pages/services/services.component';
import { ServicesService } from './pages/services/services.service';
import { AddServiceComponent } from './pages/add-service/add-service.component';
import { UpdateServiceComponent } from './pages/update-service/update-service.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsService } from './pages/products/products.service';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';
import { SalesComponent } from './pages/sales/sales.component';

const route: Routes = [
  {
    path: 'route1', component: NavbarComponent
  },
  {
    path: 'route2', component: HomeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NewsfeedComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    LoginComponent,
    AdminNavComponent,
    ConfirmDialogComponent,
    AddNewsFeedComponent,
    CategoriesComponent,
    UpdateNewsFeedComponent,
    UsersComponent,
    HomeComponent,
    ServiceDetailComponent,
    ServicesComponent,
    AddServiceComponent,
    UpdateServiceComponent,
    ProductsComponent,
    AddProductComponent,
    UpdateProductComponent,
    SalesComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFileUploadModule,
    MatChipsModule,
    NgxMatFileInputModule,
  ],
  providers: [
    HttpService,
    NewsfeedService,
    LoginService,
    ToastService,
    StorageService,
    CategoriesService,
    HomeService,
    ServicesService,
    ProductsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
