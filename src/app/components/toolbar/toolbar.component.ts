import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: any;
  notifications: [];

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private usersService: UsersService,
    private socket: Socket
  ) {}

  ngOnInit() {
    this.user = this.tokenService.getPayload();
    const dropdown = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropdown, {
      alignment: 'right',
      coverTrigger: false
    });

    this.getNotifications();

    this.socket.on('refreshPage', () => {
      this.getNotifications();
    });
  }

  getNotifications() {
    this.usersService.getUserById(this.user._id).subscribe(user => {
      this.notifications = user.notifications.reverse();
    });
  }

  markAllAsRead() {
    this.usersService.markAllAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  logout() {
    this.authService.logout();
  }
}
