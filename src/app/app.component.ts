import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mahala';

  constructor(private tokenService: TokenService, private router: Router) {}
  ngOnInit() {
    const token: string = this.tokenService.getToken();

    if (token) {
      this.router.navigate(['streams']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
