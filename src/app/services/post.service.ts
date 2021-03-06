import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3001/api/mahala';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  store(body: any): Observable<any> {
    return this.http.post(baseUrl + '/posts/store', body);
  }

  get(id: any): Observable<any> {
    return this.http.get(baseUrl + '/posts/' + id);
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl + '/posts');
  }

  getTopPosts(): Observable<any> {
    return this.http.get(baseUrl + '/posts/stream/topPosts');
  }

  like(post): Observable<any> {
    return this.http.post(baseUrl + '/posts/like', post);
  }
}
