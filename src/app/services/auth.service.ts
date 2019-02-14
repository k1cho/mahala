import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

const baseUrl = 'http://localhost:3001/api/mahala';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {}

  register(user: any): Observable<any> {
    return this.http.post(baseUrl + '/register', user);
  }

  login(user: any): Observable<any> {
    return this.http.post(baseUrl + '/login', user);
  }

  logout() {
    this.tokenService.deleteToken();
    this.router.navigate(['/']);
  }
}
