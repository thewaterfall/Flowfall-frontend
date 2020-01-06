import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtResponse} from '../../auth/JwtResponse';

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.scss']
})
export class Oauth2Component implements OnInit {

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(
      params => {
        if (params.error !== undefined) {
          window.close();
        } else {
          const jwtResponse: JwtResponse = JSON.parse(atob(params.response));

          this.tokenStorage.saveData(jwtResponse);
          window.close();
        }
      });
  }

  ngOnInit() {
  }

}
