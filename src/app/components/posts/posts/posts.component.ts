import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any = [];
  constructor(private postsService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getAll().subscribe(data => {
      this.posts = data;
    });
  }
}
