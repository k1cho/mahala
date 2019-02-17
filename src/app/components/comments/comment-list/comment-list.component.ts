import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private commentService: CommentService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content');
    this.formData = {};
    this.postId = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit() {
    this.toolbarElement.style.display = 'none';
  }

  createComment() {
    console.log(this.formData);
    this.commentService.post(this.postId, this.formData).subscribe(comment => {
      this.comments = comment;
    });
  }
}
