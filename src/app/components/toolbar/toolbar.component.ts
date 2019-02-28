import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';

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
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.user = this.tokenService.getPayload();
    const dropdown = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropdown, {
      alignment: 'right',
      coverTrigger: false
    });

    this.getNotifications();
  }

  getNotifications() {
    this.usersService.getUserById(this.user._id).subscribe(user => {
      this.notifications = user.notifications.reverse();
    });
  }

  logout() {
    this.authService.logout();
  }
}
