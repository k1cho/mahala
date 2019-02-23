import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';
import { Socket } from 'ngx-socket-io';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any = [];
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
    this.postsService.getAll().subscribe(
      data => {
        this.posts = data;
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
      data => {
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
