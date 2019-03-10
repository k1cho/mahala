import { Component, OnInit, AfterViewInit } from '@angular/core';
import M from 'materialize-css';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, AfterViewInit {
  tablElement: any;
  postsTab = true;
  followingTab = false;
  followersTab = false;

  constructor() {}

  ngOnInit() {
    this.tablElement = document.querySelector('.nav-content');
    M.Tabs.init(document.querySelector('.tabs'), {});
  }

  ngAfterViewInit() {
    this.tablElement.style.display = 'none';
  }

  changeTab(value) {
    if (value === 'posts') {
      this.postsTab = true;
      this.followersTab = false;
      this.followingTab = false;
    }

    if (value === 'following') {
      this.postsTab = false;
      this.followersTab = false;
      this.followingTab = true;
    }

    if (value === 'followers') {
      this.postsTab = false;
      this.followersTab = true;
      this.followingTab = false;
    }
  }
}
