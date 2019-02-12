import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

  signupForm: FormGroup;

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
    this.authService.register(this.signupForm.value).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    );
  }
}
