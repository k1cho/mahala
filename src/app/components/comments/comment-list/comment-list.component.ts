import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Socket } from 'ngx-socket-io';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  formData: any;
  comments: any = [];
  post: any;
  postId: any;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private postService: PostService,
    private socket: Socket
  ) {}

  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content');
    this.formData = {};
    this.postId = this.route.snapshot.paramMap.get('id');
    this.getPost();
    this.socket.on('refreshPage', () => {
      this.getPost();
    });
  }

  ngAfterViewInit() {
    this.toolbarElement.style.display = 'none';
  }

  createComment() {
    this.commentService.store(this.postId, this.formData).subscribe(
      () => {
        this.socket.emit('refresh', {});
        this.formData = {};
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  getPost() {
    this.postService.get(this.postId).subscribe(
      post => {
        this.post = post.post;
        console.log(this.post);
        this.comments = post.comments.reverse();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }
}
