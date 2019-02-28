import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css']
})
export class FollowingListComponent implements OnInit {
  users: [];
  loggedUser: any;

  constructor(private tokenService: TokenService, private usersService: UsersService, private socket: Socket) {}

  ngOnInit() {
    this.loggedUser = this.tokenService.getPayload();
    this.getFollowedUsers();
    this.socket.on('refreshPage', () => {
      this.getFollowedUsers();
    });
  }

  getFollowedUsers() {
    this.usersService.getUserById(this.loggedUser._id).subscribe(user => {
      this.users = user.following;
    });
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
}
