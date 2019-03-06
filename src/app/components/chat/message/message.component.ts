import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Socket } from 'ngx-socket-io';
import { CaretEvent, EmojiEvent } from 'ng2-emoji-picker';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit {
  receiver: string;
  sender: string;
  loggedUser: any;
  message: any;
  receiverData: any;
  messages: [];
  typingMessage;
  typing = false;

  public eventMock;
  public eventPosMock;

  public direction =
    Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : Math.random() > 0.5 ? 'right' : 'left';
  public toggled = false;
  public content = ' ';

  private _lastCaretEvent: CaretEvent;

  constructor(
    private tokenService: TokenService,
    private messagesService: MessageService,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private socket: Socket
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.receiver = params.username;
      this.getUser(this.receiver);

      this.socket.on('refreshPage', () => {
        this.getUser(this.receiver);
      });
    });

    this.socket.on('is_typing', data => {
      if (data.sender === this.receiver) {
        this.typing = true;
      }
    });

    this.socket.on('is_not_typing', data => {
      if (data.sender === this.receiver) {
        this.typing = false;
      }
    });

    this.loggedUser = this.tokenService.getPayload();
  }

  ngAfterViewInit() {
    const users = {
      user1: this.loggedUser.username,
      user2: this.receiver
    };
    this.socket.emit('join chat', users);
  }

  getUser(username) {
    this.usersService.getUserByUsername(username).subscribe(user => {
      this.receiverData = user;

      this.getAllMessages(this.loggedUser._id, user._id);
    });
  }

  store() {
    if (this.message) {
      this.messagesService
        .store(this.loggedUser._id, this.receiverData._id, this.receiverData.username, this.message)
        .subscribe(() => {
          this.socket.emit('refresh', {});
          this.message = '';
        });
    }
  }

  getAllMessages(senderId, receiverId) {
    this.messagesService.getAll(senderId, receiverId).subscribe(data => {
      this.messages = data.messages;
    });
  }

  isTyping() {
    this.socket.emit('start_typing', {
      sender: this.loggedUser.username,
      receiver: this.receiver
    });

    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }

    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.loggedUser.username,
        receiver: this.receiver
      });
    }, 1500);
  }

  handleSelection(event: EmojiEvent) {
    this.content =
      this.content.slice(0, this._lastCaretEvent.caretOffset) +
      event.char +
      this.content.slice(this._lastCaretEvent.caretOffset);
    this.eventMock = JSON.stringify(event);
    this.message += this.content;
    this.toggled = !this.toggled;
    this.content = '';
  }

  handleCurrentCaret(event: CaretEvent) {
    this._lastCaretEvent = event;
    this.eventPosMock = `{ caretOffset : ${event.caretOffset}, caretRange: Range{...}, textContent: ${
      event.textContent
    } }`;
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
