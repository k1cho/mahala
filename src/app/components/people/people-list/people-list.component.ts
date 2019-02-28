import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  users = [];
  loggedUser: any;
  userArr: [];

  constructor(private usersService: UsersService, private tokenService: TokenService, private socket: Socket) {}

  ngOnInit() {
    this.loggedUser = this.tokenService.getPayload();
    this.getUsers();
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getUsers();
      this.getUser();
    });
  }

  getUsers() {
    this.usersService.getAll().subscribe(users => {
      _.remove(users, { username: this.loggedUser.username });
      this.users = users;
    });
  }

  getUser() {
    this.usersService.show(this.loggedUser._id).subscribe(user => {
      this.userArr = user.following;
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
