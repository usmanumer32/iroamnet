import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    $(document).ready(function () {
      $('button').click(function () {
        $('ul').toggleClass('show');
      });
    });
  }

  public signout() {
    localStorage.removeItem('admin.UserId');
    this.router.navigate(['/login']);
  }

  public gotoAdmin() {
    this.router.navigate(['/admin']);
  }

  public gotoCategories() {
    this.router.navigate(['/categories']);
  }

  public gotoUsers() {
    this.router.navigate(['/users']);
  }

  public gotoServices() {
    this.router.navigate(['/services']);
  }

  public gotoProducts() {
    this.router.navigate(['/admin-products']);
  }

}
