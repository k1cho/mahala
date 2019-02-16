import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  formData: any = {};
  errorMessage: string;

  constructor(private postService: PostService, private socket: Socket) {}

  ngOnInit() {
    this.formData = {};
    this.errorMessage = '';
  }

  createPost() {
    this.postService.store(this.formData).subscribe(
      () => {
        this.socket.emit('refresh', {});
        this.formData = {};
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
