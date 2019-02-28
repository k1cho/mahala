import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.css']
})
export class FollowersListComponent implements OnInit {
  users = [];
  loggedUser: any;
  following: [];

  constructor(private usersService: UsersService, private tokenService: TokenService, private socket: Socket) {}

  ngOnInit() {
    this.loggedUser = this.tokenService.getPayload();
    this.getFollowers();
    this.getFollowing();
    this.socket.on('refreshPage', () => {
      this.getFollowers();
      this.getFollowing();
    });
  }

  getFollowers() {
    this.usersService.getUserById(this.loggedUser._id).subscribe(user => {
      this.users = user.followers;
    });
  }

  getFollowing() {
    this.usersService.getUserById(this.loggedUser._id).subscribe(user => {
      this.following = user.following;
    });
  }

  follow(id) {
    this.usersService.follow(id).subscribe(
      () => {
        this.socket.emit('refresh', {});
      },
      err => {
        console.log(err);
      }
    );
  }

  unfollow(id) {
    this.usersService.unfollow(id).subscribe(
      data => {
        this.socket.emit('refresh', {});
      },
      err => {
        console.log(err);
      }
    );
  }

  checkIfUserIsFollowed(arr, id) {
    const result = _.find(arr, ['_id', id]);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
