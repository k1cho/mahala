import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3001/api/mahala/upload-image';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  formData: any = {};
  errorMessage: string;
  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });

  selectedFile: any;

  constructor(private postService: PostService, private socket: Socket) {}

  ngOnInit() {
    this.formData = {};
    this.errorMessage = '';
  }

  createPost() {
    let body;

    if (!this.selectedFile) {
      body = {
        post: this.formData.post
      };
    } else {
      body = {
        post: this.formData.post,
        image: this.selectedFile
      };
    }
    this.postService.store(body).subscribe(
      () => {
        this.socket.emit('refresh', {});
        this.formData = {};
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  onFileSelected(event) {
    const file: File = event[0];
    this.readAsBase64(file)
      .then(result => {
        this.selectedFile = result;
      })
      .catch(err => console.log(err));
  }

  readAsBase64(file): Promise<any> {
    const reader = new FileReader();
    const value = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });

      reader.addEventListener('error', event => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });

    return value;
  }
}
