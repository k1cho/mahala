import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import { Socket } from 'ngx-socket-io';
import _ from 'lodash';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @Output() onlineUsers = new EventEmitter();
  user: any;
  notifications: [];
  unreadNotificationsCount: [];
  chats: [];
  msgCount = 0;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private usersService: UsersService,
    private socket: Socket,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.user = this.tokenService.getPayload();
    const dropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdown, {
      alignment: 'right',
      coverTrigger: false
    });

    const dropdown1 = document.querySelectorAll('.dropdown-trigger1');
    M.Dropdown.init(dropdown1, {
      alignment: 'left',
      coverTrigger: false
    });

    this.socket.emit('online', {
      room: 'global',
      user: this.user.username
    });

    this.getNotifications();

    this.socket.on('refreshPage', () => {
      this.getNotifications();
    });
  }

  ngAfterViewInit() {
    this.socket.on('usersOnline', data => {
      this.onlineUsers.emit(data);
    });
  }

  getNotifications() {
    this.usersService.getUserById(this.user._id).subscribe(
      user => {
        this.notifications = user.notifications.reverse();
        this.unreadNotificationsCount = _.filter(this.notifications, ['read', false]);
        this.chats = user.chats;
        this.checkIfMsgIsRead(this.chats);
      },
      err => {
        if (err.error.token === null) {
          this.tokenService.deleteToken();
          this.router.navigate(['']);
        }
      }
    );
  }

  markAllAsRead() {
    this.usersService.markAllAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  markAllMessagesAsRead() {
    this.messageService.markAllAsRead().subscribe(() => {
      this.socket.emit('refresh', {});
    });
  }

  checkIfMsgIsRead(arr) {
    const checkArr = [];
    for (let i = 0; i < arr.length; i++) {
      const data = arr[i].msgId.messages[arr[i].msgId.messages.length - 1];

      if (this.router.url !== `/chat/${data.senderName}`) {
        if (data.isRead === false && data.receiverName === this.user.username) {
          checkArr.push(1);
          this.msgCount = _.sum(checkArr);
        }
      }
    }
  }

  goToChatPage(name) {
    this.router.navigate(['/chat', name]);
    this.messageService.markReceiverMessage(this.user.username, name).subscribe(data => {
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
