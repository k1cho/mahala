import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';

@NgModule({
  declarations: [AuthTabsComponent, LoginComponent, SignupComponent],
  imports: [CommonModule],
  exports: [AuthTabsComponent, LoginComponent, SignupComponent]
})
export class AuthModule {}
