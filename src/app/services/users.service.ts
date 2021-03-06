import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001/api/mahala';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(baseUrl + '/users');
  }

  follow(userId): Observable<any> {
    return this.http.post(baseUrl + '/follows/follow', { userId });
  }

  unfollow(userId): Observable<any> {
    return this.http.put(baseUrl + '/follows/unfollow', { userId });
  }

  getUserById(id): Observable<any> {
    return this.http.get(baseUrl + '/users/id/' + id);
  }

  getUserByUsername(username): Observable<any> {
    return this.http.get(baseUrl + '/users/username/' + username);
  }

  markAsRead(id, deleteValue?): Observable<any> {
    return this.http.post(baseUrl + '/notifications/mark/' + id, { id, deleteValue });
  }

  markAllAsRead(): Observable<any> {
    return this.http.post(baseUrl + '/notifications/markAll', { all: true });
  }

  addImage(image): Observable<any> {
    return this.http.post(baseUrl + '/images/upload-image', { image });
  }

  setProfilePic(imgId, imgVersion): Observable<any> {
    return this.http.get(baseUrl + '/images/set-profile-image/' + imgId + '/' + imgVersion);
  }

  viewProfileNotification(id): Observable<any> {
    return this.http.post(baseUrl + '/users/view-profile', { id });
  }

  changePassword(data): Observable<any> {
    return this.http.put(baseUrl + '/users/change-password', data);
  }
}
