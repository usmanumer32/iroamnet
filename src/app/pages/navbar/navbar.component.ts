import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.tn').click(function () {
        $('ul').removeClass('show');
      });
    });

    $(document).ready(function () {
      $('.tnm').click(function () {
        $('ul').toggleClass('show');
      });
    });
  }

}
