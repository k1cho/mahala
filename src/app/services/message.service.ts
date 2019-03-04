import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001/api/mahala';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) {}

  store(senderId, receiverId, receiverName, message): Observable<any> {
    return this.http.post(baseUrl + '/messages/chat/' + senderId + '/' + receiverId, {
      receiverId,
      receiverName,
      message
    });
  }

  getAll(senderId, receiverId): Observable<any> {
    return this.http.get(baseUrl + '/messages/chat/' + senderId + '/' + receiverId);
  }
}
