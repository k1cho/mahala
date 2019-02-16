import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private cookieService: CookieService) {}

  setToken(token) {
    this.cookieService.set('auth', token);
  }

  getToken() {
    return this.cookieService.get('auth');
  }

  deleteToken() {
    this.cookieService.delete('auth');
  }

  getPayload() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
    }

    return payload.data;
  }
}
