import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any = [];
  constructor(private postsService: PostService, private socket: Socket) {}

  ngOnInit() {
    this.getPosts();
    this.socket.on('refreshPage', () => {
      this.getPosts();
    });
  }

  getPosts() {
    this.postsService.getAll().subscribe(data => {
      this.posts = data;
    });
  }

  likePost(post) {
    this.postsService.like(post).subscribe(
      data => {
        console.log(data);
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }
}
