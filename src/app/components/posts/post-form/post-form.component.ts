import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  formData: any = {};
  errorMessage: string;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.formData = {};
    this.errorMessage = '';
  }

  createPost() {
    this.postService.store(this.formData).subscribe(
      post => {
        console.log(post);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
