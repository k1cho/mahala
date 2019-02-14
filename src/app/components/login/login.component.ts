import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData: any = {};
  errorMessage: string;
  showSpinner = false;

  constructor(private router: Router, private authService: AuthService, private tokenService: TokenService) {}

  ngOnInit() {
    this.formData = {};
    this.errorMessage = '';
  }

  login() {
    this.showSpinner = true;
    this.authService.login(this.formData).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.formData = {};
        this.router.navigate(['streams']);
        this.showSpinner = false;
      },
      (err: HttpErrorResponse) => {
        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
        this.showSpinner = false;
      }
    );
  }
}
