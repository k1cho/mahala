import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  formData: any = {};
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.formData = {};
  }

  checkPasswords(password, confirmPassword) {
    if (confirmPassword.length <= 0) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      return {
        doesNotMatch: true
      };
    }
  }

  changePassword() {
    this.usersService.changePassword(this.formData).subscribe(
      () => {
        this.formData = {};
      },
      err => console.log(err)
    );
  }
}
