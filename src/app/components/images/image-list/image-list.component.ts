import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  loggedUser: any;
  images: [];

  constructor(private usersService: UsersService, private tokenService: TokenService, private socket: Socket) {}

  ngOnInit() {
    this.loggedUser = this.tokenService.getPayload();
    this.getLoggedUser();
    this.socket.on('refreshPage', () => {
      this.getLoggedUser();
    });
  }

  getLoggedUser() {
    this.usersService.getUserById(this.loggedUser._id).subscribe(
      user => {
        this.images = user.images;
      },
      err => console.log(err)
    );
  }
}
