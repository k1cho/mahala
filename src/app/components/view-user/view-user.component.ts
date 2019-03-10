import { Component, OnInit, AfterViewInit } from '@angular/core';
import M from 'materialize-css';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, AfterViewInit {
  tablElement: any;

  constructor() {}

  ngOnInit() {
    this.tablElement = document.querySelector('.nav-content');
    M.Tabs.init(document.querySelector('.tabs'), {});
  }

  ngAfterViewInit() {
    this.tablElement.style.display = 'none';
  }
}
