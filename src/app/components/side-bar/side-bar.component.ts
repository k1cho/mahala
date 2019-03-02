import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  loggedUser: any;
  user: any;

  constructor(private tokenService: TokenService, private usersService: UsersService, private socket: Socket) {}

  ngOnInit() {
    this.loggedUser = this.tokenService.getPayload();
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getUser();
    });
  }

  getUser() {
    this.usersService.getUserById(this.loggedUser._id).subscribe(user => {
      this.user = user;
    });
  }
}
