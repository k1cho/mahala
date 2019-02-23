import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  formData: any;
  comments: any = [];
  postId: any;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content');
    this.formData = {};
    this.postId = this.route.snapshot.paramMap.get('id');
    this.getPost();
  }

  ngAfterViewInit() {
    this.toolbarElement.style.display = 'none';
  }

  createComment() {
    this.commentService.store(this.postId, this.formData).subscribe(comment => {
      this.comments = comment;
      this.formData = {};
    });
  }

  getPost() {
    this.postService.get(this.postId).subscribe(post => {
      console.log(post.comments);
      this.comments = post.comments;
    });
  }
}
