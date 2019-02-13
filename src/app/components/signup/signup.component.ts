import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  formData: any = {};
  errorMessage: string;
  showSpinner = false;

  ngOnInit() {
    this.formData = {};
    this.errorMessage = '';
  }

  register() {
    this.showSpinner = true;
    this.authService.register(this.formData).subscribe(
      data => {
        console.log(data);
        this.formData = {};
        this.router.navigate(['streams']);
        this.showSpinner = false;
      },
      (err: HttpErrorResponse) => {
        if (err.error.msg) {
          this.errorMessage = err.error.msg[0].message;
        }

        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
        this.showSpinner = false;
      }
    );
  }
}
