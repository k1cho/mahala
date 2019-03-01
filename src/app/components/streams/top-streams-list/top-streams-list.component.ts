import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Socket } from 'ngx-socket-io';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import _ from 'lodash';

@Component({
  selector: 'app-top-streams-list',
  templateUrl: './top-streams-list.component.html',
  styleUrls: ['./top-streams-list.component.css']
})
export class TopStreamsListComponent implements OnInit {
  topPosts: any = [];
  user: any;

  constructor(
    private postsService: PostService,
    private socket: Socket,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.tokenService.getPayload();
    this.getPosts();
    this.socket.on('refreshPage', () => {
      this.getPosts();
    });
  }

  getPosts() {
    this.postsService.getTopPosts().subscribe(
      posts => {
        this.topPosts = posts;
      },
      err => {
        if (err.error.token === null) {
          this.tokenService.deleteToken();
          this.router.navigate(['']);
        }
      }
    );
  }

  likePost(post) {
    this.postsService.like(post).subscribe(
      () => {
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
  }

  checkIfUserLikedPost(array, id) {
    return _.some(array, { user: id });
  }

  checkIfUserCommented(array, id) {
    return _.some(array, { user: id });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  openCommentBox(post) {
    this.router.navigate(['post', post._id]);
  }
}
