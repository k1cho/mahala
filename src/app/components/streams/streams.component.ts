import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  token: any;
  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.token = this.tokenService.getToken();
    M.Tabs.init(document.querySelector('.tabs'), {});
  }
}
