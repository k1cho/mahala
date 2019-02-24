import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  users = [];
  loggedUser: any;

  constructor(private usersService: UsersService, private tokenService: TokenService) {}

  ngOnInit() {
    this.getUsers();
    this.loggedUser = this.tokenService.getPayload();
  }

  getUsers() {
    this.usersService.getAll().subscribe(users => {
      _.remove(users, { username: this.loggedUser.username });
      this.users = users;
    });
  }

  follow(id) {
    this.usersService.follow(id).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
}
