import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import { Socket } from 'ngx-socket-io';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {
  loggedUser: any;
  notifications: [];

  constructor(private tokenService: TokenService, private usersSerivce: UsersService, private socket: Socket) {}

  ngOnInit() {
    this.loggedUser = this.tokenService.getPayload();
    this.getNotifications();
    this.socket.on('refreshPage', () => {
      this.getNotifications();
    });
  }

  getNotifications() {
    this.usersSerivce.getUserById(this.loggedUser._id).subscribe(user => {
      this.notifications = user.notifications;
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  markAsRead(notification) {
    this.usersSerivce.markAsRead(notification._id).subscribe(data => {
      console.log(data);
    });
  }

  deleteNotification(notification) {
    console.log(notification);
  }
}
