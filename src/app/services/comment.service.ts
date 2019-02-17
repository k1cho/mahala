import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

const baseUrl = 'http://localhost:3001/api/mahala';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) {}

  store(post, comment): Observable<any> {
    return this.http.post(baseUrl + '/comments/store', { post, comment });
  }
}
