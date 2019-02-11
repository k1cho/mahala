import { Component, OnInit } from '@angular/core';
import * as materialize from 'materialize-css';

@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.css']
})
export class AuthTabsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const tabs = document.querySelector('.tabs');
    materialize.Tabs.init(tabs, {});
  }
}
