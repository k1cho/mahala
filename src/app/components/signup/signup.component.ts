import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

  signupForm: FormGroup;
  errorMessage: string;
  showSpinner = false;

  ngOnInit() {
    this.init();
  }

  init() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  register() {
    this.showSpinner = true;
    this.authService.register(this.signupForm.value).subscribe(
      data => {
        console.log(data);
        this.signupForm.reset();
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
