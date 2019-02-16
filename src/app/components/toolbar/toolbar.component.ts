import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private tokenService: TokenService) {}

  ngOnInit() {
    this.user = this.tokenService.getPayload();
  }

  logout() {
    this.authService.logout();
  }
}
