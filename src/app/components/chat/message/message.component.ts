import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  receiver: string;
  loggedUser: any;
  message: any;
  receiverData: any;

  constructor(
    private tokenService: TokenService,
    private messagesService: MessageService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.receiver = params.username;
      this.getUser(this.receiver);
    });
    this.loggedUser = this.tokenService.getPayload();
  }

  getUser(username) {
    this.usersService.getUserByUsername(username).subscribe(user => {
      this.receiverData = user;
    });
  }

  store() {
    if (this.message) {
      this.messagesService
        .store(this.loggedUser._id, this.receiverData._id, this.receiverData.username, this.message)
        .subscribe(data => {
          console.log(data);
          this.message = '';
        });
    }
  }
}
