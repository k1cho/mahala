import { Component, OnInit, AfterViewInit } from '@angular/core';
import M from 'materialize-css';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

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

  posts: [];
  following: [];
  followers: [];
  user: any;
  username: any;

  constructor(private route: ActivatedRoute, private usersService: UsersService) {}

  ngOnInit() {
    this.tablElement = document.querySelector('.nav-content');
    M.Tabs.init(document.querySelector('.tabs'), {});
    this.route.params.subscribe(param => {
      this.username = param.username;
      this.getUser(this.username);
    });
  }

  ngAfterViewInit() {
    this.tablElement.style.display = 'none';
  }

  getUser(username) {
    this.usersService.getUserByUsername(username).subscribe(
      user => {
        this.user = user;
        this.posts = user.posts;
        this.followers = user.followers;
        this.following = user.following;
      },
      err => console.log(err)
    );
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
