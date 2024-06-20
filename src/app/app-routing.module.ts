import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { NewsfeedComponent } from './pages/newsfeed/newsfeed.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddNewsFeedComponent } from './pages/add-news-feed/add-news-feed.component';
import { UpdateNewsFeedComponent } from './pages/update-news-feed/update-news-feed.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { UsersComponent } from './pages/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';

import { AdminGuard } from './pages/admin/admin.guard';
import { AddNewsFeedGuard } from './pages/add-news-feed/add-news-feed.guard';
import { UpdateNewsFeedGuard } from './pages/update-news-feed/update-news-feed.guard';
import { CategoriesGuard } from './pages/categories/categories.guard';
import { UsersGuard } from './pages/users/users.guard';
import { ServicesComponent } from './pages/services/services.component';
import { AddServiceComponent } from './pages/add-service/add-service.component';
import { UpdateServiceComponent } from './pages/update-service/update-service.component';
import { ServicesGuard } from './pages/services/services.guard';
import { AddServiceGuard } from './pages/add-service/add-service.guard';
import { UpdateServiceGuard } from './pages/update-service/update-service.guard';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ProductsGuard } from './pages/products/products.guard';
import { AddProductGuard } from './pages/add-product/add-product.guard';
import { UpdateProductGuard } from './pages/update-product/update-product.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'newsfeed', component: NewsfeedComponent },
  { path: 'service-detail', component: ServiceDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'add-newsfeed', component: AddNewsFeedComponent, canActivate: [AddNewsFeedGuard] },
  { path: 'update-newsfeed', component: UpdateNewsFeedComponent, canActivate: [UpdateNewsFeedGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [CategoriesGuard] },
  { path: 'users', component: UsersComponent, canActivate: [UsersGuard] },
  { path: 'services', component: ServicesComponent, canActivate: [ServicesGuard] },
  { path: 'add-service', component: AddServiceComponent, canActivate: [AddServiceGuard] },
  { path: 'update-service', component: UpdateServiceComponent, canActivate: [UpdateServiceGuard] },
  { path: 'admin-products', component: ProductsComponent, canActivate: [ProductsGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [AddProductGuard] },
  { path: 'update-product', component: UpdateProductComponent, canActivate: [UpdateProductGuard] },
  { path: 'sales', component: SalesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
